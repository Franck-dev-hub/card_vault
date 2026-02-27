import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./CardDetails.module.css";
import { useTheme } from "../../contexts/ThemeContext";
import { X, Plus, Minus, ChevronDown } from "lucide-react";

const AccordionSection = ({ title, children, isDark, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordionSection}>
      <button
        className={`${styles.accordionHeader} ${isDark ? styles.dark : styles.light}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span
          className={`${styles.accordionArrow} ${isOpen ? styles.arrowOpen : ""}`}
        >
          <ChevronDown size={24} />
        </span>
      </button>
      {isOpen && (
        <div
          className={`${styles.accordionContent} ${isDark ? styles.dark : styles.light}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default function CardDetails({ card, onClose, onOwnershipChange }) {
  const { isDark } = useTheme();

  // Tracks how many copies of each variant the user owns.
  // Keeping counts local for now; the TODO below marks where backend sync should go.
  const [quantities, setQuantities] = useState({
    Normal: 0,
    Reverse: 0,
    Holo: 0,
  });

  const handleCount = (variant, delta) => {
    setQuantities((prev) => {
      const updated = {
        ...prev,
        // Math.max(0, …) prevents the count from going below zero.
        [variant]: Math.max(0, prev[variant] + delta),
      };

      // Notify the parent when ownership status changes (at least one copy owned).
      // This lets parent components (e.g. Vault) update their owned-card lists
      // without needing to manage quantity details themselves.
      const isOwned = updated.Normal + updated.Reverse + updated.Holo > 0;
      const cardId = card.id || card.api_id;
      if (onOwnershipChange) {
        onOwnershipChange(cardId, isOwned);
      }

      // TODO: Persist quantities to the backend when the endpoint is ready.
      // axios.post('/api/vault', { cardId, quantities: updated });

      return updated;
    });
  };

  // Disable body scrolling while the modal is open so the background page
  // does not scroll underneath the overlay on mobile devices.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // useCallback stabilises the handler reference so the keydown effect below
  // only re-registers when `onClose` itself changes, not on every render.
  const handleEscape = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  // Allow keyboard users to close the modal with Escape — accessibility best practice.
  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape]);

  if (!card) return null;

  // createPortal renders the modal into document.body rather than inline in the
  // component tree. This ensures the overlay always covers the full viewport
  // regardless of any ancestor's overflow, position, or z-index constraints.
  return createPortal(
    <div className={`${styles.overlay} ${isDark ? styles.dark : ""}`}>
      <div
        className={`${styles.modalContent} ${isDark ? styles.dark : styles.light}`}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fermer"
        >
          <X size={32} />
        </button>

        <div className={styles.scrollableArea}>
          <div className={styles.cardImageContainer}>
            <img
              src={
                card.imageUrl || "https://images.pokemontcg.io/base1/back.png"
              }
              alt={card.name || "Pokemon Card"}
              className={styles.mainCardImage}
            />
            <h2
              className={`${styles.cardName} ${isDark ? styles.darkText : styles.lightText}`}
            >
              {card.name || "Card name"}
            </h2>
            <p
              className={`${styles.cardInfo} ${isDark ? styles.darkText : styles.lightText}`}
            >
              {card.number || "002"} / {card.setTotal || "69"} (
              {card.expansion || "103"}) {card.setName || "Extension"}
            </p>
          </div>

          <div className={styles.accordionGroup}>
            {/* --- GREY VAULT SECTION WITH WHITE COUNTERS --- */}
            <AccordionSection title="Vault" isDark={isDark}>
              <div className={styles.vaultWrapper}>
                {["Normal", "Reverse", "Holo"].map((variant) => (
                  <div key={variant} className={styles.vaultRow}>
                    <button
                      className={styles.vaultBtn}
                      onClick={() => handleCount(variant, -1)}
                    >
                      <Minus size={20} />
                    </button>

                    <div className={styles.vaultDisplay}>
                      {variant} : {quantities[variant]}
                    </div>

                    <button
                      className={styles.vaultBtn}
                      onClick={() => handleCount(variant, 1)}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Prices" isDark={isDark}>
              <div className={styles.pricesWrapper}>
                {[
                  {
                    type: "Normal",
                    low: card.low_prices,
                    avg: card.avg_prices,
                    trend: card.trend_prices,
                  },
                  {
                    type: "Holo",
                    low: card.low_holo_prices,
                    avg: card.avg_holo_prices,
                    trend: card.trend_holo_prices,
                  },
                ].map((priceData) => (
                  <div key={priceData.type} className={styles.priceCard}>
                    <h4 className={styles.priceTypeTitle}>{priceData.type}</h4>

                    <div className={styles.priceRow}>
                      <span>Low</span>
                      <span>{priceData.low != null ? `${priceData.low}€` : "N/A"}</span>
                    </div>

                    <div className={styles.priceRow}>
                      <span>Average</span>
                      <span>{priceData.avg != null ? `${priceData.avg}€` : "N/A"}</span>
                    </div>

                    <div className={styles.priceRow}>
                      <span>Trend</span>
                      <span>{priceData.trend != null ? `${priceData.trend}€` : "N/A"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Cards" isDark={isDark}>
              <div className={styles.comingSoonWrapper}>
                <div className={styles.comingSoonCard}>Coming soon</div>
              </div>
            </AccordionSection>

            <AccordionSection title="Description" isDark={isDark}>
              <div className={styles.descriptionWrapper}>
                <div className={styles.descriptionCard}>
                  Illustrator : {card.artist || "N/A"}
                </div>
                <div className={styles.descriptionCard}>
                  Rarity : {card.rarity || "N/A"}
                </div>
                <div className={styles.descriptionCard}>
                  Description : {card.flavorText || "N/A"}
                </div>
              </div>
            </AccordionSection>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
