import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronDown, Check } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import CardDetails from '../components/CardDetails/CardDetails';
import styles from './Search.module.css';

/**
 * Search page component.
 *
 * Allows users to browse cards filtered by license and extension. The page
 * makes two sequential API calls:
 *   1. When a license is selected — fetches available extensions for that
 *      license so the extension dropdown can be populated.
 *   2. Always — fetches the card list for the current license + extension
 *      combination. When no filters are active it fetches a default list.
 *
 * Ownership state is maintained locally so the checkmark badge updates
 * immediately after a CardDetails interaction without refetching the grid.
 */
export default function Search() {
  const { isDark } = useTheme();

  // Accordion open/close state for each filter group.
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLicenseMenuOpen, setIsLicenseMenuOpen] = useState(false);
  const [isExtensionsOpen, setIsExtensionsOpen] = useState(false);

  const [selectedLicense, setSelectedLicense] = useState(null);
  // `selectedExtension` stores the raw ID used to build the API URL.
  const [selectedExtension, setSelectedExtension] = useState(null);
  // `selectedExtObject` stores the full extension object for display purposes
  // (name label) and to pass context to CardDetails.
  const [selectedExtObject, setSelectedExtObject] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  // Keyed by card ID so individual cards can be updated in O(1) without
  // iterating the whole card list.
  const [ownedCards, setOwnedCards] = useState({});

  /**
   * Called by CardDetails when the user toggles ownership for a card.
   * Updates the local `ownedCards` map optimistically so the grid reflects
   * the change before the next API sync.
   *
   * @param {string|number} cardId
   * @param {boolean} isOwned
   */
  const handleOwnershipChange = (cardId, isOwned) => {
    setOwnedCards((prev) => ({ ...prev, [cardId]: isOwned }));
  };

  // --- API CALL 1: extensions for the selected license ---
  // The URL is set to null when no license is selected so `useApi` skips the
  // request rather than hitting a malformed endpoint.
  const extUrl = selectedLicense ? `/search/${selectedLicense.toLowerCase()}` : null;
  const { data: extData } = useApi(extUrl);

  // --- API CALL 2: cards for the selected license + extension ---
  const dynamicUrl = selectedLicense
    ? `/search/${selectedLicense.toLowerCase()}${selectedExtension ? `/${selectedExtension.toLowerCase()}` : ''}`
    : '/search';
  const { data, loading, error } = useApi(dynamicUrl);

  const licenses = ["Pokemon", "Magic"];

  // Reverse the extensions list so the most recently released set appears at
  // the top of the dropdown, matching how collectors typically search.
  // `useMemo` avoids re-reversing on every render when only unrelated state
  // changes (e.g. dropdown open/close).
  const availableExtensions = useMemo(() => {
    const rawData = extData?.data && Array.isArray(extData.data)
      ? extData.data
      : (Array.isArray(extData) ? extData : []);

    // Spread into a new array before reversing so the original API response
    // cache is not mutated.
    return [...rawData].reverse();
  }, [extData]);

  // Normalise the card list across the three possible response shapes the API
  // may return depending on the endpoint variant hit.
  const cards = Array.isArray(data) ? data : (data?.cards || data?.data || []);

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>

      {/* FILTER ACCORDION */}
      <div className={styles.accordionWrapper}>
        <button className={styles.accordionHeader} onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <span className={styles.label}>Filter</span>
          {isFilterOpen ? <ChevronDown className={styles.icon} size={24} /> : <ChevronLeft className={styles.icon} size={24} />}
        </button>

        {isFilterOpen && (
          <div className={styles.content}>
            {/* LICENSE SUB-MENU */}
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
                      // Reset extension selection when the license changes so
                      // stale extension IDs from another license are not used.
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

            {/* EXTENSION SUB-MENU — only visible once a license is chosen */}
            {selectedLicense && (
              <div className={styles.subAccordionWrapper}>
                <button className={styles.subAccordionHeader} onClick={() => setIsExtensionsOpen(!isExtensionsOpen)}>
                  <span className={styles.subLabel}>Extensions</span>
                  <div className={styles.subSelectArea}>
                    <span className={styles.selectedValue}>
                      {selectedExtObject ? (selectedExtObject.extension_name || selectedExtObject.set_name) : '-- Select --'}
                    </span>
                    <ChevronLeft className={`${styles.subIcon} ${isExtensionsOpen ? styles.iconOpen : ''}`} size={20} />
                  </div>
                </button>
                {isExtensionsOpen && (
                  <div className={styles.licenseList}>
                    {availableExtensions.length > 0 ? (
                      availableExtensions.map((ext) => {
                        // Support both Pokemon (extension_id) and Magic (set_id)
                        // response shapes with a unified ID reference.
                        const extId = ext.extension_id || ext.set_id || ext.id;
                        return (
                          <div key={extId} className={styles.licenseItem} onClick={() => {
                            setSelectedExtension(extId);
                            setSelectedExtObject(ext);
                            setIsExtensionsOpen(false);
                          }}>
                            <div className={styles.extRow}>
                              <span className={styles.extensionName}>{ext.extension_name || ext.set_name}</span>
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

      {/* SORT ACCORDION (not yet implemented) */}
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

      {/* RESULTS GRID */}
      <div className={styles.mainDisplay}>
        {loading && <div className={styles.loader}>Searching for the best maps...</div>}
        {error && <div className={styles.error}>Error: {error}</div>}

        {!loading && cards.length > 0 && (
          <div className={styles.resultsGrid}>
            {cards.map((card) => {
              // Build the image URL differently per license because the Pokemon
              // API returns a base path while the Magic API returns a full URL.
              const imgUrl = card.license === 'Magic'
                ? (card.card_image?.small_image || '')
                : (card.card_image ? `${card.card_image}/low.png` : '');
              return (
                <div
                  // Prefer the most specific ID available; fall back along a
                  // chain to handle different API response shapes gracefully.
                  key={card.card_id || card.id || card.api_id}
                  className={styles.cardWrapper}
                  onClick={() => setSelectedCard({
                    ...card,
                    imageUrl: imgUrl,
                    number: card.card_number,
                    // Provide the set name for display in CardDetails, sourcing
                    // it from the selected extension object when possible.
                    setName: selectedExtObject?.extension_name || selectedExtObject?.set_name || card.extension_name,
                  })}
                >
                  <div className={styles.cardContainer}>
                    <img
                      src={imgUrl}
                      alt={card.name}
                      className={styles.cardImage}
                      // Defer off-screen image loads to reduce initial bandwidth
                      // on large extension sets.
                      loading="lazy"
                    />
                    {/* Show a checkmark badge only when the card is recorded
                        as owned so the grid gives an instant collection overview. */}
                    {ownedCards[card.card_id || card.id || card.api_id] && (
                      <div className={styles.ownedBadge}>
                        <Check size={30} strokeWidth={3} />
                      </div>
                    )}
                    <div className={styles.cardHoverInfo}>
                      <span className={styles.cardId}>#{card.card_number}</span>
                      <p className={styles.cardName}>{card.card_name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mount CardDetails as an overlay only when a card is selected to
          avoid rendering a hidden panel on every grid render. */}
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
