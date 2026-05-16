import {useState, useEffect} from "react";
import {X, ChevronDown, ChevronUp} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";
import "./CardModal.css";

interface CardImage {
  small_image?: string;
  medium_image?: string;
}

interface CardDetail {
  license: string;
  card_id: string;
  card_number: string;
  card_name: string;
  extension_id: string;
  extension_name: string;
  extension_total_card: number;
  illustrator: string | null;
  card_image: string | CardImage | null;
  rarity: string | null;
  description: string | null;
  avg_prices: number | { eur?: string } | null;
  low_prices: number | null;
  trend_prices: number | null;
  avg_holo_prices: number | null;
  low_holo_prices: number | null;
  trend_holo_prices: number | null;
  variant: string[];
}

interface CardModalProps {
  license: string;
  extensionId: string;
  cardNumber: string;
  onClose: () => void;
}

// Get the best available image URL for both Pokémon and Magic cards
const getImageUrl = (img: string | CardImage | null | undefined): string => {
  if (!img) return "";
  if (typeof img === "string") {
    if (img.includes("high.webp") || img.includes("scryfall")) return img;
    return `${img}/high.webp`;
  }
  return img.medium_image ?? img.small_image ?? "";
};

// Format price for both Pokémon (number) and Magic ({eur: string}) formats
const formatPrice = (price: number | { eur?: string } | null): string => {
  if (price === null || price === undefined) return "—";
  if (typeof price === "number") return `${price}€`;
  if (typeof price === "object" && price.eur) return `${price.eur}€`;
  return "—";
};

const VARIANTS = ["Normal", "Reverse", "Holo"];

const CardModal = ({license, extensionId, cardNumber, onClose}: CardModalProps) => {
  const {isDark} = useTheme();

  const [card, setCard] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>("vault");
  const [quantities, setQuantities] = useState<Record<string, number>>({
    Normal: 0,
    Reverse: 0,
    Holo: 0,
  });
  const [saving, setSaving] = useState<Record<string, boolean>>({
    Normal: false,
    Reverse: false,
    Holo: false,
  });

  // Fetch card details and existing vault quantities on mount
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const r = await fetch(
          `/api/search/${license}/${extensionId}/${cardNumber}`,
          {credentials: "include"}
        );
        const data = await r.json();
        const cardData = Array.isArray(data) ? data[0] : data;
        setCard(cardData);

        // Load existing quantities from vault
        const vaultRes = await fetch(
          `/api/vault/${cardData.card_id}`,
          {credentials: "include"}
        );
        if (vaultRes.ok) {
          const vaultData = await vaultRes.json();
          setQuantities({
            Normal: vaultData.normal ?? 0,
            Reverse: vaultData.reverse ?? 0,
            Holo: vaultData.holo ?? 0,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    void fetchCard();
  }, [license, extensionId, cardNumber]);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Send +1 or -1 delta to the backend vault endpoint
  const syncVault = async (cardId: string, variant: string, delta: number): Promise<boolean> => {
    try {
      const r = await fetch("/api/vault", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
          card_id: cardId,
          variant: variant.toLowerCase(),
          quantity: delta,
          card_image: card ? getImageUrl(card.card_image) : "",
          extension_id: extensionId,
          card_number: cardNumber,
          card_name: card?.card_name ?? "",
        }),
      });
      return r.ok;
    } catch {
      return false;
    }
  };

  // Optimistic increment — rollback on failure
  const handleIncrement = async (variant: string) => {
    if (!card || saving[variant]) return;
    setQuantities((prev) => ({...prev, [variant]: prev[variant] + 1}));
    setSaving((prev) => ({...prev, [variant]: true}));
    const ok = await syncVault(card.card_id, variant, 1);
    if (!ok) setQuantities((prev) => ({...prev, [variant]: prev[variant] - 1}));
    setSaving((prev) => ({...prev, [variant]: false}));
  };

  // Optimistic decrement — rollback on failure
  const handleDecrement = async (variant: string) => {
    if (!card || saving[variant] || quantities[variant] <= 0) return;
    setQuantities((prev) => ({...prev, [variant]: prev[variant] - 1}));
    setSaving((prev) => ({...prev, [variant]: true}));
    const ok = await syncVault(card.card_id, variant, -1);
    if (!ok) setQuantities((prev) => ({...prev, [variant]: prev[variant] + 1}));
    setSaving((prev) => ({...prev, [variant]: false}));
  };

  const hasNormalPrices = card && (!!card.low_prices || !!card.avg_prices || !!card.trend_prices);
  const hasHoloPrices = card && (!!card.low_holo_prices || !!card.avg_holo_prices || !!card.trend_holo_prices);

  return (
    <div className="card-modal-overlay" onClick={onClose}>
      <div
        className={`card-modal ${isDark ? "dark" : "light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className={`card-modal-close ${isDark ? "dark" : "light"}`} onClick={onClose}>
          <X size={20}/>
        </button>

        {loading || !card ? (
          <div className="card-modal-loading">Loading...</div>
        ) : (
          <>
            {/* Card image */}
            <div className="card-modal-image-wrap">
              <img
                src={getImageUrl(card.card_image)}
                alt={card.card_name}
                className="card-modal-image"
              />
            </div>

            {/* Card name and info */}
            <div className="card-modal-info">
              <h2 className={`card-modal-name ${isDark ? "dark" : "light"}`}>
                {card.card_name}
              </h2>
              <p className={`card-modal-sub ${isDark ? "dark" : "light"}`}>
                {card.card_number} / {card.extension_total_card} · {card.extension_name}
              </p>
            </div>

            {/* Accordion sections */}
            <div className="card-modal-sections">

              {/* Vault section */}
              <div className={`card-modal-section ${isDark ? "dark" : "light"}`}>
                <button
                  className={`card-modal-section-header ${isDark ? "dark" : "light"}`}
                  onClick={() => toggleSection("vault")}
                >
                  <span>Vault</span>
                  {openSection === "vault" ? <ChevronDown size={18}/> : <ChevronUp size={18}/>}
                </button>
                {openSection === "vault" && (
                  <div className="card-modal-section-body">
                    {VARIANTS.map((variant) => (
                      <div key={variant} className={`card-modal-variant-row ${isDark ? "dark" : "light"}`}>
                        {/* Decrement button — disabled when quantity is 0 */}
                        <button
                          className={`card-modal-qty-btn ${isDark ? "dark" : "light"}`}
                          onClick={() => handleDecrement(variant)}
                          disabled={quantities[variant] <= 0 || saving[variant]}
                        >
                          -1
                        </button>
                        {/* Quantity label — green tint when owned */}
                        <div
                          className={`card-modal-qty-label ${isDark ? "dark" : "light"} ${quantities[variant] > 0 ? "owned" : ""}`}>
                          {`${variant} : ${quantities[variant]}`}
                        </div>
                        {/* Increment button */}
                        <button
                          className={`card-modal-qty-btn ${isDark ? "dark" : "light"}`}
                          onClick={() => handleIncrement(variant)}
                          disabled={saving[variant]}
                        >
                          +1
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Prices section */}
              <div className={`card-modal-section ${isDark ? "dark" : "light"}`}>
                <button
                  className={`card-modal-section-header ${isDark ? "dark" : "light"}`}
                  onClick={() => toggleSection("prices")}
                >
                  <span>Prices</span>
                  {openSection === "prices" ? <ChevronDown size={18}/> : <ChevronUp size={18}/>}
                </button>
                {openSection === "prices" && (
                  <div className="card-modal-section-body">
                    {hasNormalPrices && (
                      <div className={`card-modal-price-group ${isDark ? "dark" : "light"}`}>
                        <p className="card-modal-price-title">Normal</p>
                        {!!card.low_prices && (
                          <div className="card-modal-price-row">
                            <span>Low</span><span>{formatPrice(card.low_prices)}</span>
                          </div>
                        )}
                        {!!card.avg_prices && (
                          <div className="card-modal-price-row">
                            <span>Average</span><span>{formatPrice(card.avg_prices)}</span>
                          </div>
                        )}
                        {!!card.trend_prices && (
                          <div className="card-modal-price-row">
                            <span>Trend</span><span>{formatPrice(card.trend_prices)}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {hasHoloPrices && (
                      <div className={`card-modal-price-group ${isDark ? "dark" : "light"}`}>
                        <p className="card-modal-price-title">Holo</p>
                        {!!card.low_holo_prices && (
                          <div className="card-modal-price-row">
                            <span>Low</span><span>{formatPrice(card.low_holo_prices)}</span>
                          </div>
                        )}
                        {!!card.avg_holo_prices && (
                          <div className="card-modal-price-row">
                            <span>Average</span><span>{formatPrice(card.avg_holo_prices)}</span>
                          </div>
                        )}
                        {!!card.trend_holo_prices && (
                          <div className="card-modal-price-row">
                            <span>Trend</span><span>{formatPrice(card.trend_holo_prices)}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {!hasNormalPrices && !hasHoloPrices && (
                      <p className={`card-modal-coming-soon ${isDark ? "dark" : "light"}`}>
                        No prices available
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Cards section */}
              <div className={`card-modal-section ${isDark ? "dark" : "light"}`}>
                <button
                  className={`card-modal-section-header ${isDark ? "dark" : "light"}`}
                  onClick={() => toggleSection("cards")}
                >
                  <span>Cards</span>
                  {openSection === "cards" ? <ChevronDown size={18}/> : <ChevronUp size={18}/>}
                </button>
                {openSection === "cards" && (
                  <div className="card-modal-section-body">
                    <p className={`card-modal-coming-soon ${isDark ? "dark" : "light"}`}>
                      Coming soon
                    </p>
                  </div>
                )}
              </div>

              {/* Description section */}
              <div className={`card-modal-section ${isDark ? "dark" : "light"}`}>
                <button
                  className={`card-modal-section-header ${isDark ? "dark" : "light"}`}
                  onClick={() => toggleSection("description")}
                >
                  <span>Description</span>
                  {openSection === "description" ? <ChevronDown size={18}/> : <ChevronUp size={18}/>}
                </button>
                {openSection === "description" && (
                  <div className="card-modal-section-body">
                    {card.illustrator && (
                      <p className={`card-modal-desc-item ${isDark ? "dark" : "light"}`}>
                        Illustrator : {card.illustrator}
                      </p>
                    )}
                    {card.rarity && (
                      <p className={`card-modal-desc-item ${isDark ? "dark" : "light"}`}>
                        Rarity : {card.rarity}
                      </p>
                    )}
                    {card.description && (
                      <p className={`card-modal-desc-item ${isDark ? "dark" : "light"}`}>
                        Description : {card.description}
                      </p>
                    )}
                    {card.variant?.length > 0 && (
                      <p className={`card-modal-desc-item ${isDark ? "dark" : "light"}`}>
                        Variants : {card.variant.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardModal;