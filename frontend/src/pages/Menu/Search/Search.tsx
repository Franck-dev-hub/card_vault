import {useState, useEffect} from "react";
import {ChevronDown, ChevronLeft} from "lucide-react";
import {useTheme} from "../../../context/ThemeContext";
import Layout from "../../../components/layout/Layout";
import CardModal from "../../../components/card/CardModal";
import "./Search.css";

interface CardImage {
  small_image?: string;
  medium_image?: string;
}

interface Card {
  card_id: string;
  card_name: string;
  card_number: string;
  card_image: string | CardImage | null;
  extension_id: string;
  license: string;
}

interface Extension {
  extension_id: string;
  extension_name: string;
  extension_logo: string | null;
  extension_total_card: number;
  license: string;
}

interface License {
  name: string;
  id: string;
}

interface SelectedCard {
  extensionId: string;
  cardNumber: string;
}

const getImageUrl = (img: string | CardImage | null | undefined): string => {
  if (!img) return "";
  if (typeof img === "string") {
    if (img.includes("high.webp") || img.includes("scryfall")) return img;
    return `${img}/high.webp`;
  }
  return img.medium_image ?? img.small_image ?? "";
};

// Extrait l'extensionId depuis extension_id de la carte
// Pokémon: "base1-1" → "base1" (dernier segment numérique retiré)
// Magic:   "lea"     → "lea"   (pas de segment numérique final)
const extractExtensionId = (extensionId: string): string => {
  const parts = extensionId.split("-");
  const lastPart = parts[parts.length - 1];
  const isNumber = /^\d+$/.test(lastPart);
  return isNumber ? parts.slice(0, -1).join("-") : extensionId;
};

const Search = () => {
  const {isDark} = useTheme();

  const [licenses, setLicenses] = useState<Record<string, License>>({});
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [selectedExtension, setSelectedExtension] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  useEffect(() => {
    fetch("/api/search", {credentials: "include"})
      .then((r) => r.json())
      .then(setLicenses)
      .catch(console.error);
  }, []);

  const fetchExtensions = async (license: string) => {
    setLoading(true);
    try {
      const r = await fetch(`/api/search/${license}`, {credentials: "include"});
      const data = await r.json();
      setSelectedExtension(null);
      setCards([]);
      // Pokémon API returns oldest first — reverse to show newest first
      // Magic API already returns newest first
      setExtensions(license === "pokemon" ? [...data].reverse() : data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCards = async (license: string, extension: string) => {
    setLoading(true);
    try {
      const r = await fetch(`/api/search/${license}/${extension}`, {credentials: "include"});
      const data = await r.json();
      setCards(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedLicense) return;
    fetchExtensions(selectedLicense);
  }, [selectedLicense]);

  useEffect(() => {
    if (!selectedLicense || !selectedExtension) return;
    fetchCards(selectedLicense, selectedExtension);
  }, [selectedExtension]);

  const handleCardClick = (card: Card) => {
    const extensionId = extractExtensionId(card.extension_id);
    setSelectedCard({extensionId, cardNumber: card.card_number});
  };

  return (
    <Layout>
      <div className={`search-page ${isDark ? "dark" : "light"}`}>

        {/* Filter */}
        <div className="search-block">
          <button
            className={`search-row ${isDark ? "dark" : "light"}`}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsSortOpen(false);
            }}
          >
            <span className="search-row-label">Filter</span>
            {isFilterOpen ? <ChevronDown size={18}/> : <ChevronLeft size={18}/>}
          </button>

          {isFilterOpen && (
            <div className={`search-filter-body ${isDark ? "dark" : "light"}`}>
              <div className={`search-select-row ${isDark ? "dark" : "light"}`}>
                <span>Licenses</span>
                <select
                  className={`search-select ${isDark ? "dark" : "light"}`}
                  value={selectedLicense ?? ""}
                  onChange={(e) => setSelectedLicense(e.target.value || null)}
                >
                  <option value="">-- Select --</option>
                  {Object.entries(licenses).map(([key, val]) => (
                    <option key={key} value={key}>{val.name}</option>
                  ))}
                </select>
              </div>

              {selectedLicense && extensions.length > 0 && (
                <div className={`search-select-row ${isDark ? "dark" : "light"}`}>
                  <span>Extensions</span>
                  <select
                    className={`search-select ${isDark ? "dark" : "light"}`}
                    value={selectedExtension ?? ""}
                    onChange={(e) => setSelectedExtension(e.target.value || null)}
                  >
                    <option value="">-- Select --</option>
                    {extensions.map((ext) => (
                      <option key={ext.extension_id} value={ext.extension_id}>
                        {ext.extension_name ?? ext.extension_id}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="search-block">
          <button
            className={`search-row ${isDark ? "dark" : "light"}`}
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsFilterOpen(false);
            }}
          >
            <span className="search-row-label">Sort</span>
            {isSortOpen ? <ChevronDown size={18}/> : <ChevronLeft size={18}/>}
          </button>
          {isSortOpen && (
            <div className={`search-filter-body ${isDark ? "dark" : "light"}`}>
              <p className="search-coming-soon">Coming soon</p>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <p className={`search-loading ${isDark ? "dark" : "light"}`}>Loading...</p>
        )}

        {/* Cards grid */}
        {!loading && cards.length > 0 && (
          <div className="search-grid">
            {cards.map((card) => (
              <div
                key={card.card_id}
                className="search-card"
                style={{cursor: "pointer"}}
                onClick={() => handleCardClick(card)}
              >
                <img
                  src={getImageUrl(card.card_image)}
                  alt={card.card_name}
                  className="search-card-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Card Modal */}
      {selectedCard && selectedLicense && (
        <CardModal
          license={selectedLicense}
          extensionId={selectedCard.extensionId}
          cardNumber={selectedCard.cardNumber}
          onClose={() => setSelectedCard(null)}
        />
      )}

    </Layout>
  );
};

export default Search;