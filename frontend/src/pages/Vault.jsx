import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { ChevronDown, ArrowLeft, ChevronRight, Check } from "lucide-react";
import styles from "./Vault.module.css";

const cardBack = "https://images.pokemonfree.com/back.png";

/**
 * Vault page component.
 *
 * Implements a multi-level drill-down navigator (menu → licenses →
 * extensions → cards) using a single `view` string instead of nested routes,
 * which keeps the navigation self-contained and avoids polluting the URL with
 * intermediate steps that the user cannot meaningfully bookmark.
 *
 * NOTE: `licensesData` and `extensionsData` are static mock data while the
 * real API endpoints are under development. They should be replaced with
 * `useApi` calls when ready.
 */
export default function Vault() {
  const { isDark } = useTheme();

  // `view` acts as the navigation stack; changing it re-renders the
  // appropriate sub-view without an actual route change.
  const [view, setView] = useState("menu");
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [selectedExtension, setSelectedExtension] = useState(null);

  // --- MOCK DATA (replace with API calls) ---
  const licensesData = [
    { id: 1, name: "Pokémon", logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg", count: 2523 },
    { id: 2, name: "Magic", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Magicthegathering-logo.svg", count: 1348 },
  ];

  const extensionsData = [
    { id: 1, license_id: 1, name: "Base Set", collected: 112, total: 134, masterCollected: 115, masterTotal: 216, logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" },
    { id: 2, license_id: 2, name: "Modern Horizons", collected: 100, total: 134, masterCollected: 105, masterTotal: 200, logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Magicthegathering-logo.svg" },
    { id: 3, license_id: 1, name: "Jungle", collected: 80, total: 134, masterCollected: 85, masterTotal: 160, logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" },
  ];

  /**
   * Navigates one level up in the drill-down hierarchy.
   *
   * The back destination depends on the current view and whether a license
   * was previously selected, so there is no fixed parent — it is computed
   * at call time.
   */
  const handleBack = () => {
    if (view === "cards") setView(selectedLicense ? "licenses_extensions" : "extensions");
    else if (view === "licenses_extensions") setView("licenses");
    else setView("menu");
  };

  // --- VIEW RENDERERS ---
  // Each renderer is a separate function so that JSX in the root return
  // stays minimal — only one view is active at a time.
  const renderMainMenu = () => (
    <div className={styles.menuList}>
      <button className={styles.menuButton} onClick={() => setView("licenses")}>Licenses</button>
      <button className={styles.menuButton} onClick={() => setView("extensions")}>Extensions</button>
      <button className={styles.menuButton} onClick={() => setView("inventories")}>Inventories</button>
      <button className={styles.menuButton} onClick={() => setView("decks")}>Decks</button>
    </div>
  );

  const renderLicenses = () => (
    <div className={styles.viewContainer}>
      <div className={styles.headerTitle}>
        <ArrowLeft onClick={handleBack} className={styles.backIcon} />
        <span>Licenses</span>
      </div>
      <button className={styles.sortButton}><span>Sort</span><ChevronDown size={20} /></button>
      <div className={styles.scrollList}>
        {licensesData.map((lib) => (
          // Selecting a license stores it and drills into its extension list.
          <div key={lib.id} className={styles.licenseCard} onClick={() => { setSelectedLicense(lib); setView("licenses_extensions"); }}>
            <div className={styles.logoWrapper}><img src={lib.logo} alt={lib.name} className={styles.licenseLogo} /></div>
            <div className={styles.countBox}>
              <div className={styles.countNumber}>{lib.count}</div>
              <div className={styles.countLabel}>Cards owned</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders the extensions list, optionally filtered to the selected license.
   *
   * The same renderer is reused for the global "Extensions" view (all
   * licenses) and the per-license drill-down ("licenses_extensions"), keeping
   * filter logic in a single place.
   *
   * @param {boolean} filterByLicense - When true, only show extensions that
   *   belong to `selectedLicense`.
   */
  const renderExtensions = (filterByLicense = false) => {
    const list = filterByLicense ? extensionsData.filter(e => e.license_id === selectedLicense.id) : extensionsData;
    return (
      <div className={styles.viewContainer}>
        <div className={styles.headerTitle}>
          <ArrowLeft onClick={handleBack} className={styles.backIcon} />
          <span>{filterByLicense ? selectedLicense.name : "Extensions"}</span>
        </div>
        <button className={styles.sortButton}><span>Sort</span> <ChevronRight size={20} /></button>
        <div className={styles.scrollList}>
          {list.map((ext) => (
            <div key={ext.id} className={styles.extensionCard} onClick={() => { setSelectedExtension(ext); setView("cards"); }}>
              <div className={styles.extHeader}>
                <img src={ext.logo} alt="logo" className={styles.extMiniLogo} />
                <div className={styles.extInfo}>
                  <span className={styles.extName}>{ext.name}</span>
                  {/* Progress bar width is computed inline as a percentage so
                      CSS does not need to know the collected/total values. */}
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${(ext.collected / ext.total) * 100}%` }}></div>
                  </div>
                  <div className={styles.extStats}>
                    <span>{ext.collected} / {ext.total}</span> <span className={styles.megTag}>MEG</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCards = () => (
    <div className={styles.viewContainer}>
      <div className={styles.headerTitle}>
        <ArrowLeft onClick={handleBack} className={styles.backIcon} />
        <span>{selectedExtension?.name || "Extension"}</span>
      </div>

      <button className={styles.sortButton}>
        <span>Sort</span>
        <ChevronRight size={20} />
      </button>

      {/* Two progress bars side-by-side: "complete set" tracks base cards,
          "master set" includes all variants/secret rares. */}
      <div className={styles.statsHeaderRow}>
        <div className={styles.statBox}>
          <span className={styles.statTitle}>Complete set</span>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${(selectedExtension?.collected / selectedExtension?.total) * 100}%` }}></div>
          </div>
          <span className={styles.statValues}>{selectedExtension?.collected} of {selectedExtension?.total}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statTitle}>Master set</span>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${(selectedExtension?.masterCollected / selectedExtension?.masterTotal) * 100}%` }}></div>
          </div>
          <span className={styles.statValues}>{selectedExtension?.masterCollected} of {selectedExtension?.masterTotal}</span>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {[...Array(12)].map((_, i) => {
          // Simulates owned status with a 1-in-3 pattern until the real
          // ownership data is fetched from the API.
          const isOwned = i % 3 === 0;
          return (
            <div key={i} className={styles.cardWrapper}>
              <div className={styles.cardContainer}>
                <img
                  src={cardBack}
                  alt="card"
                  className={styles.cardImage}
                  // Unowned cards are visually dimmed to distinguish them from
                  // owned cards without hiding them entirely.
                  style={{ opacity: isOwned ? 1 : 0.6 }}
                />
                {isOwned && (
                  <div className={styles.ownedBadge}>
                    <Check size={30} strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /**
   * Generic placeholder renderer for views that are not yet implemented.
   *
   * @param {string} title - The view name to display in the header.
   */
  const renderPlaceholder = (title) => (
    <div className={styles.viewContainer}>
      <div className={styles.headerTitle}>
        <ArrowLeft onClick={handleBack} className={styles.backIcon} />
        <span>{title}</span>
      </div>
      <div className={styles.comingSoonCard}>Coming soon</div>
    </div>
  );

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      {/* Render exactly one view based on the current navigation state. */}
      {view === "menu" && renderMainMenu()}
      {view === "licenses" && renderLicenses()}
      {view === "extensions" && renderExtensions(false)}
      {view === "licenses_extensions" && renderExtensions(true)}
      {view === "cards" && renderCards()}
      {view === "inventories" && renderPlaceholder("Inventories")}
      {view === "decks" && renderPlaceholder("Decks")}
    </div>
  );
}