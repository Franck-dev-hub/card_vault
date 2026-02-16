import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Dashboard.module.css';
import { CircleUserRound } from 'lucide-react';
import CardDetails from '../components/CardDetails/CardDetails';

export default function Dashboard() {
  const { loading, error } = useApi('/dashboard');
  const { isDark } = useTheme();

  const [selectedCard, setSelectedCard] = useState(null);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error : {error}</div>;

  const lastCards = [
    { id: 1, name: "Pikachu", number: "025", setTotal: "102", expansion: "BS", setName: "Base Set", imageUrl: "https://images.pokemontcg.io/base1/58.png" },
    { id: 2, name: "Dracaufeu", number: "004", setTotal: "102", expansion: "BS", setName: "Base Set", imageUrl: "https://images.pokemontcg.io/base1/4.png" },
    { id: 3, name: "Mewtwo", number: "010", setTotal: "102", expansion: "BS", setName: "Base Set", imageUrl: "https://images.pokemontcg.io/base1/10.png" },
    { id: 4, name: "Tortank", number: "002", setTotal: "102", expansion: "BS", setName: "Base Set", imageUrl: "https://images.pokemontcg.io/base1/2.png" },
  ];

  const handleOpenCard = (card) => {
    setSelectedCard(card);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
  };

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      
      {/* Section Profil */}
      <div className={styles.profileCard}>
        <div className={styles.avatarPlaceholder}>
          <CircleUserRound
            size={48}
            strokeWidth={1.5}
            color={isDark ? "#ffffff" : "#333333"}
          />
        </div>
        <h2 className={styles.username}>Pseudo</h2>
      </div>

      {/* Section Stats */}
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Cards</span>
          <span className={styles.statValue}>1235</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Value</span>
          <span className={styles.statValue}>657 €</span>
        </div>
      </div>

      {/* Section Last Cards added */}
      <div className={styles.sectionHeader}>
        <h3>Last cards added</h3>
      </div>

      <div className={styles.scrollWrapper}>
        {lastCards.map((card) => (
          <div 
            key={card.id} 
            className={styles.cardItem}
            onClick={() => handleOpenCard(card)} // Clic pour ouvrir
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={card.imageUrl} 
              alt={card.name} 
              className={styles.cardImage}
            />
          </div>
        ))}
      </div>

      {selectedCard && (
        <CardDetails 
          card={selectedCard} 
          onClose={handleCloseCard} 
        />
      )}
    </div>
  );
}