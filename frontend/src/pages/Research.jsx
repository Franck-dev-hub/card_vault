import { useState } from 'react';
import { ChevronLeft, ChevronDown, Search } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Research.module.css';

export default function Research() {
  const { isDark } = useTheme();
  
  // --- ÉTATS POUR L'INTERFACE ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLicenseMenuOpen, setIsLicenseMenuOpen] = useState(false);
  const [isExtensionsOpen, setIsExtensionsOpen] = useState(false);

  // --- ÉTATS POUR LA RECHERCHE ---
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [selectedExtension, setSelectedExtension] = useState(null);

  // --- CONSTRUCTION DE L'URL DYNAMIQUE (FastAPI) ---
  const dynamicUrl = selectedLicense 
    ? `/search/${selectedLicense.toLowerCase()}${selectedExtension ? `/${selectedExtension.toLowerCase()}` : ''}`
    : '/search';

  // Appel API réel
  const { data, loading, error } = useApi(dynamicUrl);

  // --- LOGIQUE DE DONNÉES ---
  // 1. Les licences (Pokemon, Magic)
  const licenses = ["Pokemon", "Magic"];

  // 2. Les extensions (si on est sur /search/pokemon, data contient la liste des sets)
  const availableExtensions = Array.isArray(data) 
  ? data 
  : (data?.name ? [data] : []);

  // 3. Les cartes (si on est sur /search/pokemon/base1, les cartes sont dans data.cards)
  const cards = data?.cards || [];

  console.log("Données reçues :", data);
  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      
      {/* --- SECTION FILTER --- */}
      <div className={styles.accordionWrapper}>
        <button className={styles.accordionHeader} onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <span className={styles.label}>Filter</span>
          {isFilterOpen ? <ChevronDown className={styles.icon} size={24} /> : <ChevronLeft className={styles.icon} size={24} />}
        </button>

        {isFilterOpen && (
          <div className={styles.content}>
            
            {/* SÉLECTEUR DE LICENCE */}
            <div className={styles.subAccordionWrapper}>
              <button className={styles.subAccordionHeader} onClick={() => setIsLicenseMenuOpen(!isLicenseMenuOpen)}>
                <span className={styles.subLabel}>Licenses</span>
                <div className={styles.subSelectArea}>
                  <span className={styles.selectedValue}>{selectedLicense || '-- Select --'}</span>
                  <ChevronLeft className={`${styles.subIcon} ${isLicenseMenuOpen ? styles.iconOpen : ''}`} size={20} />
                </div>
              </button>
              {isLicenseMenuOpen && (
                <div className={styles.licenseList}>
                  {licenses.map((lib) => (
                    <div key={lib} className={styles.licenseItem} onClick={() => { 
                      setSelectedLicense(lib); 
                      setSelectedExtension(null); 
                      setIsLicenseMenuOpen(false); 
                    }}>
                      {lib}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SÉLECTEUR D'EXTENSION (Dynamique via l'API) */}
            {selectedLicense && (
              <div className={styles.subAccordionWrapper}>
                <button className={styles.subAccordionHeader} onClick={() => setIsExtensionsOpen(!isExtensionsOpen)}>
                  <span className={styles.subLabel}>Extensions</span>
                  <div className={styles.subSelectArea}>
                    <span className={styles.selectedValue}>
                      {selectedExtension ? availableExtensions.find(e => e.id === selectedExtension)?.name : '-- Select --'}
                    </span>
                    <ChevronLeft className={`${styles.subIcon} ${isExtensionsOpen ? styles.iconOpen : ''}`} size={20} />
                  </div>
                </button>
                {isExtensionsOpen && (
                  <div className={styles.licenseList}>
                    {availableExtensions.length > 0 ? (
                      availableExtensions.map((ext) => (
                        <div key={ext.id} className={styles.licenseItem} onClick={() => { 
                          setSelectedExtension(ext.id); 
                          setIsExtensionsOpen(false); 
                        }}>
                          <div className={styles.extRow}>
                            <span>{ext.name}</span>
                            <small className={styles.cardCount}>{ext.cardCount?.total} cards</small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noData}>Loading extensions...</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- SECTION SORT --- */}
      <div className={styles.accordionWrapper}>
        <button className={styles.accordionHeader} onClick={() => setIsSortOpen(!isSortOpen)}>
          <span className={styles.label}>Sort</span>
          {isSortOpen ? <ChevronDown className={styles.icon} size={24} /> : <ChevronLeft className={styles.icon} size={24} />}
        </button>
        {isSortOpen && <div className={styles.content}><div className={styles.comingSoon}>Coming soon</div></div>}
      </div>

      {/* --- GRILLE DE RÉSULTATS --- */}
      <div className={styles.mainDisplay}>
        {loading && <div className={styles.loader}>Searching for the best maps...</div>}
        
        {error && <div className={styles.error}>Error: {error}</div>}

        {!loading && cards.length > 0 && (
          <div className={styles.resultsGrid}>
            {cards.map((card) => (
              <div key={card.id} className={styles.cardWrapper}>
                <div className={styles.cardContainer}>
                  <img 
                    src={`${card.image}/low.png`} 
                    alt={card.name} 
                    className={styles.cardImage}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://tcg.pokemon.com/assets/img/global/tcg-card-back.png';
                    }}
                  />
                  <div className={styles.cardHoverInfo}>
                    <span className={styles.cardId}>#{card.localId}</span>
                    <p className={styles.cardName}>{card.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}