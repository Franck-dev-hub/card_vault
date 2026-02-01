import { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Research.module.css';

export default function Research() {
  const { loading, error } = useApi('/research/');
  const { isDark } = useTheme();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [isLicenseMenuOpen, setIsLicenseMenuOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);

  const [isExtensionsOpen, setIsExtensionsOpen] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState(null);

  const licenses = ["Pokemon", "Magic"];
  const extensions = ["Base1"];

  // Simulation de 9 cartes pour remplir la grille 3x3
  const cards = Array(9).fill({ id: 1 });
  
  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      
      {/* SECTION FILTER */}
      <div className={styles.accordionWrapper}>
        <button className={styles.accordionHeader} onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <span className={styles.label}>Filter</span>
          {isFilterOpen ? <ChevronDown className={styles.icon} size={24} /> : <ChevronLeft className={styles.icon} size={24} />}
        </button>

        {isFilterOpen && (
          <div className={styles.content}>
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
                    <div key={lib} className={styles.licenseItem} onClick={() => { setSelectedLicense(lib); setIsLicenseMenuOpen(false); }}>
                      {lib}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedLicense && (
              <div className={styles.subAccordionWrapper}>
                <button className={styles.subAccordionHeader} onClick={() => setIsExtensionsOpen(!isExtensionsOpen)}>
                  <span className={styles.subLabel}>Extensions</span>
                  <div className={styles.subSelectArea}>
                    <span className={styles.selectedValue}>{selectedExtension || '-- Select --'}</span>
                    <ChevronLeft className={`${styles.subIcon} ${isExtensionsOpen ? styles.iconOpen : ''}`} size={20} />
                  </div>
                </button>
                {isExtensionsOpen && (
                  <div className={styles.licenseList}>
                    {extensions.map((ext) => (
                      <div key={ext} className={styles.licenseItem} onClick={() => { setSelectedExtension(ext); setIsExtensionsOpen(false); }}>
                        {ext}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION SORT */}
      <div className={styles.accordionWrapper}>
        <button className={styles.accordionHeader} onClick={() => setIsSortOpen(!isSortOpen)}>
          <span className={styles.label}>Sort</span>
          {isSortOpen ? <ChevronDown className={styles.icon} size={24} /> : <ChevronLeft className={styles.icon} size={24} />}
        </button>
        {isSortOpen && (
          <div className={styles.content}>
            <div className={styles.comingSoon}>Coming soon</div>
          </div>
        )}
      </div>

      {/* GRILLE DE CARTES (Apparaît après sélection) */}
      {selectedLicense && selectedExtension && (
        <div className={styles.resultsGrid}>
          {cards.map((_, index) => (
            <div key={index} className={styles.cardWrapper}>
              <img 
                src="https://static.fnac-static.com/multimedia/Images/FR/MDM/b1/5c/25/19225777/1540-1/tsp20241106022234/Carte-a-collectionner-Pokemon-Carte-Promo-Go-1-Bonus-de-commande-ne-peut-etre-vendu-separement.jpg" 
                alt="Pokemon Card" 
                className={styles.cardImage}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}