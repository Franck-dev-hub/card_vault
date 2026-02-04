import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './CardDetails.module.css';
import { useTheme } from '../../contexts/ThemeContext';
import { X } from 'lucide-react'; // Utilisation de Lucide pour une croix propre

const AccordionSection = ({ title, children, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionSection}>
      <button 
        className={`${styles.accordionHeader} ${isDark ? styles.dark : styles.light}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className={`${styles.accordionArrow} ${isOpen ? styles.arrowOpen : ''}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
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
        
        {/* BOUTON STATIQUE : Il est en dehors de la zone de scroll */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
          <X size={32} />
        </button>

        {/* ZONE DE SCROLL : Tout le contenu interne défilera ici */}
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
            <AccordionSection title="Vault" isDark={isDark}>
              <p>Détails du coffre pour cette carte...</p>
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