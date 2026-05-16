import {useEffect, useState} from "react";
import {useTheme} from "../../../context/ThemeContext";
import Layout from "../../../components/layout/Layout";
import "./Stats.css";

interface LastCard {
  card_id: string;
  card_name: string;
  card_image: string;
  card_number: string;
  extension_id: string;
  license: string;
}

interface VaultStats {
  total_cards: number;
  unique_cards: number;
  unique_extensions: number;
  by_license: Record<string, number>;
  by_variant: Record<string, number>;
  last_card: LastCard | null;
}

const LICENSE_COLORS: Record<string, string> = {
  pokemon: "#f59e0b",
  magic: "#8b5cf6",
};

const VARIANT_COLORS: Record<string, string> = {
  normal: "#667EEA",
  reverse: "#22c55e",
  holo: "#f59e0b",
  foil: "#8b5cf6",
  nonfoil: "#6b7280",
};

const getImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  if (url.includes("high.webp") || url.includes("scryfall")) return url;
  return `${url}/high.webp`;
};

const Stats = () => {
  const {isDark} = useTheme();
  const [stats, setStats] = useState<VaultStats | null>(null);
  const [loading, setLoading] = useState(true);

  const [licenseTotals, setLicenseTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/vault/stats", {credentials: "include"})
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Fetch total available cards per license from extensions
  useEffect(() => {
    if (!stats) return;
    const fetchTotals = async () => {
      const totals: Record<string, number> = {};
      await Promise.all(
        Object.keys(stats.by_license).map(async (license) => {
          try {
            const r = await fetch(`/api/search/${license}`, {credentials: "include"});
            const extensions = await r.json();
            const total = extensions.reduce(
              (sum: number, ext: { extension_total_card: number }) => sum + (ext.extension_total_card ?? 0),
              0
            );
            totals[license] = total;
          } catch {
            totals[license] = 0;
          }
        })
      );
      setLicenseTotals(totals);
    };
    fetchTotals();
  }, [stats]);

  if (loading) {
    return (
      <Layout>
        <div className={`stats-page ${isDark ? "dark" : "light"}`}>
          <p className="stats-loading">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!stats) return null;

  const maxVariant = Math.max(...Object.values(stats.by_variant), 1);

  return (
    <Layout>
      <div className={`stats-page ${isDark ? "dark" : "light"}`}>

        {/* Overview cards */}
        <div className="stats-overview">
          <div className={`stats-overview-item ${isDark ? "dark" : "light"}`}>
            <span className="stats-overview-value">{stats.total_cards}</span>
            <span className="stats-overview-label">Total cards</span>
          </div>
          <div className={`stats-overview-item ${isDark ? "dark" : "light"}`}>
            <span className="stats-overview-value">{stats.unique_cards}</span>
            <span className="stats-overview-label">Unique cards</span>
          </div>
          <div className={`stats-overview-item ${isDark ? "dark" : "light"}`}>
            <span className="stats-overview-value">{stats.unique_extensions}</span>
            <span className="stats-overview-label">Extensions</span>
          </div>
          <div className={`stats-overview-item ${isDark ? "dark" : "light"}`}>
            <span className="stats-overview-value">—</span>
            <span className="stats-overview-label">Total value</span>
          </div>
        </div>

        {/* Distribution by license */}
        {Object.keys(stats.by_license).length > 0 && (
          <div className={`stats-card ${isDark ? "dark" : "light"}`}>
            <h3 className="stats-card-title">Distribution by license</h3>
            <div className="stats-bar-list">
              {Object.entries(stats.by_license).map(([license, count]) => {
                const total = licenseTotals[license] ?? 0;
                const progress = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={license} className="stats-bar-row">
                    <div className="stats-bar-row-header">
                      <span className="stats-bar-row-label">
                        {license.charAt(0).toUpperCase() + license.slice(1)}
                      </span>
                      <span className="stats-bar-row-count">
                        {count} / {total > 0 ? total.toLocaleString("fr-FR") : "—"}
                      </span>
                    </div>
                    <div className={`stats-bar-track ${isDark ? "dark" : "light"}`}>
                      <div
                        className="stats-bar-fill"
                        style={{
                          width: `${Math.min(progress, 100)}%`,
                          background: LICENSE_COLORS[license] ?? "#667EEA",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Distribution by variant */}
        {Object.keys(stats.by_variant).length > 0 && (
          <div className={`stats-card ${isDark ? "dark" : "light"}`}>
            <h3 className="stats-card-title">Distribution by variant</h3>
            <div className="stats-bar-list">
              {Object.entries(stats.by_variant).map(([variant, count]) => (
                <div key={variant} className="stats-bar-row">
                  <div className="stats-bar-row-header">
                    <span className="stats-bar-row-label">
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </span>
                    <span className="stats-bar-row-count">{count}</span>
                  </div>
                  <div className={`stats-bar-track ${isDark ? "dark" : "light"}`}>
                    <div
                      className="stats-bar-fill"
                      style={{
                        width: `${(count / maxVariant) * 100}%`,
                        background: VARIANT_COLORS[variant] ?? "#667EEA",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last card added */}
        {stats.last_card && (
          <div className={`stats-card ${isDark ? "dark" : "light"}`}>
            <h3 className="stats-card-title">Last card added</h3>
            <div className="stats-last-card">
              <img
                src={getImageUrl(stats.last_card.card_image)}
                alt={stats.last_card.card_id}
                className="stats-last-card-img"
              />
              <div className="stats-last-card-info">
                <span className={`stats-last-card-id ${isDark ? "dark" : "light"}`}>
                  {stats.last_card.card_name || `Card #${stats.last_card.card_number || stats.last_card.card_id}`}
                </span>
                <span className={`stats-last-card-ext ${isDark ? "dark" : "light"}`}>
                  {stats.last_card.extension_id} · {stats.last_card.license}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {stats.total_cards === 0 && (
          <div className="stats-empty">
            <p>No cards in your vault yet.</p>
            <p>Start adding cards to see your stats!</p>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Stats;