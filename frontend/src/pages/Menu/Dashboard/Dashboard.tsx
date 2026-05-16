import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowRight, TrendingUp,} from "lucide-react";
import {useAuth} from "../../../context/AuthContext";
import {useTheme} from "../../../context/ThemeContext";
import Layout from "../../../components/layout/Layout";
import CardModal from "../../../components/card/CardModal";
import "./Dashboard.css";

interface VaultStats {
  total_cards: number;
}

interface RecentCard {
  card_id: string;
  card_number: string;
  extension_id: string;
  license: string;
  card_image: string;
  updated_at: string;
}

interface LicenseStat {
  name: string;
  count: number;
  color: string;
}

interface SelectedCard {
  license: string;
  extensionId: string;
  cardNumber: string;
}

const getImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  if (url.includes("high.webp") || url.includes("scryfall")) return url;
  return `${url}/high.webp`;
};

const LICENSE_COLORS: Record<string, string> = {
  pokemon: "#f59e0b",
  magic: "#8b5cf6",
};

const LICENSE_NAMES: Record<string, string> = {
  pokemon: "Pokémon",
  magic: "Magic",
};

const Dashboard = () => {
  const {user} = useAuth();
  const {isDark} = useTheme();
  const navigate = useNavigate();

  const [stats, setStats] = useState<VaultStats>({total_cards: 0});
  const [recentCards, setRecentCards] = useState<RecentCard[]>([]);
  const [licenseStats, setLicenseStats] = useState<LicenseStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, recentRes] = await Promise.all([
          fetch("/api/vault", {credentials: "include"}),
          fetch("/api/vault/recent", {credentials: "include"}),
        ]);

        const statsData = await statsRes.json();
        setStats(statsData);

        const recentData: RecentCard[] = await recentRes.json();
        setRecentCards(recentData);

        // Calcul stats par license depuis les cartes récentes
        // On fetch toutes les cartes pour avoir un vrai compte
        const licenseCounts: Record<string, number> = {};
        recentData.forEach((card) => {
          licenseCounts[card.license] = (licenseCounts[card.license] ?? 0) + 1;
        });

        const ls: LicenseStat[] = Object.entries(licenseCounts).map(([key, count]) => ({
          name: LICENSE_NAMES[key] ?? key,
          count,
          color: LICENSE_COLORS[key] ?? "#667EEA",
        }));

        setLicenseStats(ls);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (card: RecentCard) => {
    setSelectedCard({
      license: card.license,
      extensionId: card.extension_id,
      cardNumber: card.card_number,
    });
  };

  const maxLicenseCount = Math.max(...licenseStats.map((l) => l.count), 1);

  return (
    <Layout>
      <div className={`dashboard ${isDark ? "dark" : "light"}`}>

        {/* ── Hero profile ── */}
        <div className={`dashboard-hero ${isDark ? "dark" : "light"}`}>
          <div className="dashboard-hero-left">
            <div className={`dashboard-avatar-lg ${isDark ? "dark" : "light"}`}>
              {user?.username?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div className="dashboard-hero-info">
              <span className="dashboard-hero-name">{user?.username}</span>
              <span className="dashboard-hero-email">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div className="dashboard-stats-grid">
          <div className={`dashboard-stat-card ${isDark ? "dark" : "light"}`}>
            <div className="dashboard-stat-icon" style={{background: "#ede9fe", color: "#667EEA"}}>
              🃏
            </div>
            <div className="dashboard-stat-content">
              <span className="dashboard-stat-value">
                {loading ? "—" : stats.total_cards.toLocaleString()}
              </span>
              <span className="dashboard-stat-label">Total cards</span>
            </div>
          </div>

          <div className={`dashboard-stat-card ${isDark ? "dark" : "light"}`}>
            <div className="dashboard-stat-icon" style={{background: "#dcfce7", color: "#22c55e"}}>
              <TrendingUp size={20}/>
            </div>
            <div className="dashboard-stat-content">
              <span className="dashboard-stat-value">—</span>
              <span className="dashboard-stat-label">Total value</span>
            </div>
          </div>

          <div className={`dashboard-stat-card ${isDark ? "dark" : "light"}`}>
            <div className="dashboard-stat-icon" style={{background: "#fef3c7", color: "#f59e0b"}}>
              ⭐
            </div>
            <div className="dashboard-stat-content">
              <span className="dashboard-stat-value">—</span>
              <span className="dashboard-stat-label">Best card</span>
            </div>
          </div>

          <div className={`dashboard-stat-card ${isDark ? "dark" : "light"}`}>
            <div className="dashboard-stat-icon" style={{background: "#dbeafe", color: "#3b82f6"}}>
              📦
            </div>
            <div className="dashboard-stat-content">
              <span className="dashboard-stat-value">
                {loading ? "—" : licenseStats.length}
              </span>
              <span className="dashboard-stat-label">Licenses</span>
            </div>
          </div>
        </div>

        {/* ── Last cards added ── */}
        <div className={`dashboard-section-card ${isDark ? "dark" : "light"}`}>
          <div className="dashboard-section-header">
            <h3 className="dashboard-section-title">Last cards added</h3>
            <button
              className="dashboard-see-all"
              onClick={() => navigate("/vault")}
            >
              See all <ArrowRight size={14}/>
            </button>
          </div>

          {loading ? (
            <p className="dashboard-loading">Loading...</p>
          ) : recentCards.length === 0 ? (
            <div className="dashboard-empty">
              <p>No cards in your vault yet.</p>
              <button
                className="dashboard-cta"
                onClick={() => navigate("/search")}
              >
                Start searching cards
              </button>
            </div>
          ) : (
            <div className="dashboard-cards-scroll">
              {recentCards.map((card) => (
                <div
                  key={card.card_id}
                  className="dashboard-card-item"
                  onClick={() => handleCardClick(card)}
                >
                  <img
                    src={getImageUrl(card.card_image)}
                    alt={card.card_id}
                    className="dashboard-card-img"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── License breakdown ── */}
        {licenseStats.length > 0 && (
          <div className={`dashboard-section-card ${isDark ? "dark" : "light"}`}>
            <div className="dashboard-section-header">
              <h3 className="dashboard-section-title">Collection by license</h3>
            </div>
            <div className="dashboard-license-list">
              {licenseStats.map((lic) => (
                <div key={lic.name} className="dashboard-license-item">
                  <div className="dashboard-license-info">
                    <span className="dashboard-license-name">{lic.name}</span>
                    <span className="dashboard-license-count">{lic.count}</span>
                  </div>
                  <div className={`dashboard-license-track ${isDark ? "dark" : "light"}`}>
                    <div
                      className="dashboard-license-fill"
                      style={{
                        width: `${(lic.count / maxLicenseCount) * 100}%`,
                        background: lic.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {selectedCard && (
        <CardModal
          license={selectedCard.license}
          extensionId={selectedCard.extensionId}
          cardNumber={selectedCard.cardNumber}
          onClose={() => setSelectedCard(null)}
        />
      )}

    </Layout>
  );
};

export default Dashboard;