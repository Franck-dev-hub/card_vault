import {useState, useEffect} from "react";
import {useTheme} from "../../../context/ThemeContext";
import Layout from "../../../components/layout/Layout";
import CardModal from "../../../components/card/CardModal";
import "./Vault.css";

interface CardImage {
  small_image?: string;
  medium_image?: string;
}

interface OwnedCard {
  card_id: string;
  card_number: string;
  extension_id: string;
  license: string;
  card_image: string;
  quantity: number;
}

interface SelectedCard {
  license: string;
  extensionId: string;
  cardNumber: string;
}

const LICENSE_LABELS: Record<string, string> = {
  pokemon: "Pokémon",
  magic: "Magic",
};

// Get the best image URL for both Pokémon (string) and Magic (object) formats
const getImageUrl = (img: string | CardImage | null | undefined): string => {
  if (!img) return "";
  if (typeof img === "string") {
    if (img.includes("high.webp") || img.includes("scryfall")) return img;
    return `${img}/high.webp`;
  }
  return img.medium_image ?? img.small_image ?? "";
};

const Vault = () => {
  const {isDark} = useTheme();
  const [cards, setCards] = useState<OwnedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  // Load all owned cards on mount
  useEffect(() => {
    fetch("/api/vault/cards", {credentials: "include"})
      .then((r) => r.json())
      .then(setCards)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const licenses = ["all", ...Array.from(new Set(cards.map((c) => c.license)))];

  const filtered = activeFilter === "all"
    ? cards
    : cards.filter((c) => c.license === activeFilter);

  const handleCardClick = (card: OwnedCard) => {
    setSelectedCard({
      license: card.license,
      extensionId: card.extension_id,
      cardNumber: card.card_number,
    });
  };

  // Refresh cards after closing modal in case quantities changed
  const handleModalClose = () => {
    setSelectedCard(null);
    fetch("/api/vault/cards", {credentials: "include"})
      .then((r) => r.json())
      .then(setCards)
      .catch(console.error);
  };

  return (
    <Layout>
      <div className={`vault-page ${isDark ? "dark" : "light"}`}>

        {/* Filter tabs */}
        <div className="vault-filters">
          {licenses.map((license) => (
            <button
              key={license}
              className={`vault-filter-btn ${activeFilter === license ? "active" : ""} ${isDark ? "dark" : "light"}`}
              onClick={() => setActiveFilter(license)}
            >
              {license === "all" ? "All" : (LICENSE_LABELS[license] ?? license)}
            </button>
          ))}
        </div>

        {/* Card count */}
        <p className={`vault-count ${isDark ? "dark" : "light"}`}>
          {filtered.length} card{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Cards grid */}
        {loading ? (
          <p className="vault-loading">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="vault-empty">
            <p>No cards in your vault yet.</p>
          </div>
        ) : (
          <div className="vault-cards-grid">
            {filtered.map((card) => (
              <div
                key={card.card_id}
                className={"vault-card owned"}
                onClick={() => handleCardClick(card)}
                style={{cursor: "pointer"}}
              >
                <img
                  src={getImageUrl(card.card_image)}
                  alt={card.card_id}
                  className="vault-card-img"
                  loading="lazy"
                />
                {card.quantity > 1 && (
                  <span className="vault-card-qty">{card.quantity}</span>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Card Modal */}
      {selectedCard && (
        <CardModal
          license={selectedCard.license}
          extensionId={selectedCard.extensionId}
          cardNumber={selectedCard.cardNumber}
          onClose={handleModalClose}
        />
      )}

    </Layout>
  );
};

export default Vault;