import { useState, useMemo } from 'react'; // Ajout de useMemo pour la performance
import { ChevronLeft, ChevronDown, Check } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import CardDetails from '../components/CardDetails/CardDetails';
import styles from './Search.module.css';

export default function Search() {
  const { isDark } = useTheme();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLicenseMenuOpen, setIsLicenseMenuOpen] = useState(false);
  const [isExtensionsOpen, setIsExtensionsOpen] = useState(false);

  const [selectedLicense, setSelectedLicense] = useState(null);
  const [selectedExtension, setSelectedExtension] = useState(null);
  const [selectedExtObject, setSelectedExtObject] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [ownedCards, setOwnedCards] = useState({});

  // Callback appelé par CardDetails quand les quantités changent
  const handleOwnershipChange = (cardId, isOwned) => {
    setOwnedCards((prev) => ({ ...prev, [cardId]: isOwned }));
  };

  // 1. APPEL POUR LES EXTENSIONS
  const extUrl = selectedLicense ? `/search/${selectedLicense.toLowerCase()}` : null;
  const { data: extData } = useApi(extUrl);

  // 2. APPEL POUR LES CARTES
  const dynamicUrl = selectedLicense 
    ? `/search/${selectedLicense.toLowerCase()}${selectedExtension ? `/${selectedExtension.toLowerCase()}` : ''}`
    : '/search';
  const { data, loading, error } = useApi(dynamicUrl);

  const licenses = ["Pokemon", "Magic"];

  // --- LOGIQUE D'INVERSION DES EXTENSIONS ---
  // On utilise useMemo pour ne pas recalculer l'inversion à chaque rendu
  const availableExtensions = useMemo(() => {
    const rawData = extData?.data && Array.isArray(extData.data)
      ? extData.data
      : (Array.isArray(extData) ? extData : []);
    
    // On crée une copie avec [...] puis on inverse pour mettre les plus récentes en haut
    return [...rawData].reverse();
  }, [extData]);

  const cards = Array.isArray(data) ? data : (data?.cards || data?.data || []);

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
            {/* SOUS-MENU LICENCES */}
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
                      setSelectedExtObject(null);
                      setIsLicenseMenuOpen(false); 
                    }}>
                      {lib}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SOUS-MENU EXTENSIONS (INVERSÉES) */}
            {selectedLicense && (
              <div className={styles.subAccordionWrapper}>
                <button className={styles.subAccordionHeader} onClick={() => setIsExtensionsOpen(!isExtensionsOpen)}>
                  <span className={styles.subLabel}>Extensions</span>
                  <div className={styles.subSelectArea}>
                    <span className={styles.selectedValue}>
                      {selectedExtObject ? (selectedExtObject.set_name || selectedExtObject.name) : '-- Select --'}
                    </span>
                    <ChevronLeft className={`${styles.subIcon} ${isExtensionsOpen ? styles.iconOpen : ''}`} size={20} />
                  </div>
                </button>
                {isExtensionsOpen && (
                  <div className={styles.licenseList}>
                    {availableExtensions.length > 0 ? (
                      availableExtensions.map((ext) => {
                        const extId = ext.set_id || ext.id || ext.code;
                        return (
                          <div key={extId} className={styles.licenseItem} onClick={() => {
                            setSelectedExtension(extId);
                            setSelectedExtObject(ext);
                            setIsExtensionsOpen(false);
                          }}>
                            <div className={styles.extRow}>
                              <span className={styles.extensionName}>{ext.set_name || ext.name}</span>
                            </div>
                          </div>
                        );
                      })
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

      {/* GRILLE DE RÉSULTATS */}
      <div className={styles.mainDisplay}>
        {loading && <div className={styles.loader}>Searching for the best maps...</div>}
        {error && <div className={styles.error}>Error: {error}</div>}

        {!loading && cards.length > 0 && (
          <div className={styles.resultsGrid}>
            {cards.map((card) => {
              const imgUrl = card.image_url
                ? (card.license === 'magic' ? card.image_url : `${card.image_url}/low.png`)
                : '';
              return (
                <div
                  key={card.card_id || card.id || card.api_id}
                  className={styles.cardWrapper}
                  onClick={() => setSelectedCard({
                    ...card,
                    imageUrl: imgUrl,
                    number: card.card_number || card.localId || card.collector_number,
                    setName: selectedExtObject?.set_name || selectedExtObject?.name || card.set_name,
                  })}
                >
                  <div className={styles.cardContainer}>
                    <img
                      src={imgUrl}
                      alt={card.name}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    {ownedCards[card.card_id || card.id || card.api_id] && (
                      <div className={styles.ownedBadge}>
                        <Check size={30} strokeWidth={3} />
                      </div>
                    )}
                    <div className={styles.cardHoverInfo}>
                      <span className={styles.cardId}>#{card.card_number || card.localId || card.collector_number}</span>
                      <p className={styles.cardName}>{card.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedCard && (
        <CardDetails
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onOwnershipChange={handleOwnershipChange}
        />
      )}
    </div>
  );
}