import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { useTheme } from "../contexts/ThemeContext";
import { ChevronDown, ArrowLeft, ChevronRight } from "lucide-react";
import styles from "./Vault.module.css";

const pokemonLogo = "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg";
const magicLogo = "https://www.icomedia.eu/wp-content/uploads/2021/03/MTG_Primary_LL_2c_Black_LG_V12-1.png";
const yugiohLogo = "https://upload.wikimedia.org/wikipedia/commons/1/11/Yu-Gi-Oh%21_%28Logo%29.jpg";
const cardBack = "https://images.pokemonfree.com/back.png";

export default function Vault() {
  const { loading, error } = useApi("/vault/");
  const { isDark } = useTheme();
  
  // États de navigation
  const [openSection, setOpenSection] = useState(null);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [selectedExtension, setSelectedExtension] = useState(null);

  const licensesData = [
    { id: 1, name: "Pokémon", logo: pokemonLogo, count: 2523 },
    { id: 2, name: "Magic", logo: magicLogo, count: 1348 },
    { id: 3, name: "Yu-Gi-Oh", logo: yugiohLogo, count: 850 },
  ];

  const extensionsData = [
    { id: 1, name: "Base Set", collected: 112, total: 134, masterCollected: 115, masterTotal: 216 },
    { id: 2, name: "Jungle", collected: 100, total: 134, masterCollected: 105, masterTotal: 216 },
    { id: 3, name: "Fossil", collected: 80, total: 134, masterCollected: 90, masterTotal: 216 },
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    if (selectedExtension) {
      setSelectedExtension(null);
    } else {
      setSelectedLicense(null);
      setOpenSection("licenses"); // Reste sur licences après le retour
    }
  };

  // --- RENDU DES VUES ---
  
  const renderLicenses = () => (
    <div className={styles.licensesContainer}>
      <button className={styles.sortButton} onClick={(e) => e.stopPropagation()}>
        <span>Sort</span> <ChevronDown size={20} />
      </button>
      <div className={styles.licensesList}>
        {licensesData.map((lib) => (
          <div key={lib.id} className={styles.licenseCard} onClick={() => { setSelectedLicense(lib); setOpenSection(null); }}>
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

  const renderExtensions = () => (
    <div className={styles.licensesContainer}>
      <button className={styles.sortButton} onClick={(e) => e.stopPropagation()}>
        <span>Sort</span> <ChevronRight size={20} />
      </button>
      <div className={styles.licensesList}>
        {extensionsData.map((ext) => (
          <div key={ext.id} className={styles.extensionCard} onClick={() => setSelectedExtension(ext)}>
            <div className={styles.extHeader}>
              <div className={styles.extIconPlaceholder}>🔆</div>
              <div className={styles.extInfo}>
                <span className={styles.extName}>{ext.name}</span>
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

  const renderCards = () => (
    <div className={styles.licensesContainer}>
      <button className={styles.sortButton} onClick={(e) => e.stopPropagation()}>
        <span>Sort</span> <ChevronRight size={20} />
      </button>
      <div className={styles.setsOverview}>
        <div className={styles.setStat}>
          <span className={styles.setLabel}>Complete set</span>
          <div className={styles.miniProgress}><div style={{ width: '80%' }}></div></div>
          <span className={styles.setNumbers}>{selectedExtension.collected} of {selectedExtension.total}</span>
        </div>
        <div className={styles.setStat}>
          <span className={styles.setLabel}>Master set</span>
          <div className={styles.miniProgress}><div style={{ width: '50%' }}></div></div>
          <span className={styles.setNumbers}>{selectedExtension.masterCollected} of {selectedExtension.masterTotal}</span>
        </div>
      </div>
      <div className={styles.cardsGrid}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.cardItem}><img src={cardBack} alt="card" /></div>
        ))}
      </div>
    </div>
  );

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.menuList}>
        
        {/* 1. SECTION LICENSES */}
        <div className={styles.accordionItem}>
          <button className={styles.menuButton} onClick={() => toggleSection("licenses")}>
            <div className={styles.selectedTitle}>
              {selectedLicense && !selectedExtension && <ArrowLeft size={20} onClick={handleBack} />}
              <span>{selectedLicense ? selectedLicense.name : "Licenses"}</span>
            </div>
          </button>
          <div className={`${styles.content} ${openSection === "licenses" ? styles.show : ""}`}>
             {renderLicenses()}
          </div>
        </div>

        {/* 2. SECTION EXTENSIONS (Maintenant toujours visible) */}
        <div className={styles.accordionItem}>
          <button className={styles.menuButton} onClick={() => toggleSection("extensions")}>
             <div className={styles.selectedTitle}>
              {selectedExtension && <ArrowLeft size={20} onClick={handleBack} />}
              <span>{selectedExtension ? selectedExtension.name : "Extensions"}</span>
            </div>
          </button>
          <div className={`${styles.content} ${openSection === "extensions" ? styles.show : ""}`}>
            {selectedExtension ? renderCards() : selectedLicense ? renderExtensions() : <div className={styles.emptyBox}>Select a license first</div>}
          </div>
        </div>

        {/* 3. AUTRES SECTIONS */}
        {["inventories", "decks"].map((id) => (
          <div key={id} className={styles.accordionItem}>
            <button className={styles.menuButton} onClick={() => toggleSection(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
            <div className={`${styles.content} ${openSection === id ? styles.show : ""}`}>
              <div className={styles.emptyBox}>{id} content...</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}