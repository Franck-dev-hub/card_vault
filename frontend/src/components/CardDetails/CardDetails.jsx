import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './CardDetails.module.css';
import { useTheme } from '../../contexts/ThemeContext';
import { X, Plus, Minus, ChevronDown } from 'lucide-react'; 

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
        <span className={`${styles.accordionArrow} ${isOpen ? styles.arrowOpen : ''}`}>
          <ChevronDown size={24} />
        </span>
      </button>
      {isOpen && (
        <div className={`${styles.accordionContent} ${isDark ? styles.dark : styles.light}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function CardDetails({ card, onClose }) {
  const { isDark } = useTheme();

  // --- ÉTAT POUR LES COMPTEURS VAULT ---
  const [quantities, setQuantities] = useState({ Normal: 0, Reverse: 0, Holo: 0 });

  const handleCount = (variant, delta) => {
    setQuantities(prev => ({
      ...prev,
      [variant]: Math.max(0, prev[variant] + delta)
    }));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape]);

  if (!card) return null;

  return createPortal(
    <div className={`${styles.overlay} ${isDark ? styles.dark : ''}`}>
      <div className={`${styles.modalContent} ${isDark ? styles.dark : styles.light}`}>
        
        <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
          <X size={32} />
        </button>

        <div className={styles.scrollableArea}>
          <div className={styles.cardImageContainer}>
            <img 
              src={card.imageUrl || "https://images.pokemontcg.io/base1/back.png"} 
              alt={card.name || "Pokemon Card"} 
              className={styles.mainCardImage} 
            />
            <h2 className={`${styles.cardName} ${isDark ? styles.darkText : styles.lightText}`}>
              {card.name || "Card name"}
            </h2>
            <p className={`${styles.cardInfo} ${isDark ? styles.darkText : styles.lightText}`}>
              {card.number || "002"} / {card.setTotal || "69"} ({card.expansion || "103"}) {card.setName || "Extension"}
            </p>
          </div>

          <div className={styles.accordionGroup}>
            {/* --- SECTION VAULT GRISE AVEC COMPTEURS BLANCS --- */}
            <AccordionSection title="Vault" isDark={isDark} defaultOpen={true}>
              <div className={styles.vaultWrapper}>
                {['Normal', 'Reverse', 'Holo'].map((variant) => (
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
              <p>Historique des prix et prix actuels...</p>
            </AccordionSection>

            <AccordionSection title="Cards" isDark={isDark}>
              <p>Autres versions de cette carte...</p>
            </AccordionSection>

            <AccordionSection title="Description" isDark={isDark}>
              <p>Description détaillée de la carte...</p>
            </AccordionSection>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}