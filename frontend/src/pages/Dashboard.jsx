import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Dashboard.module.css';
import { CircleUserRound } from 'lucide-react';
import CardDetails from '../components/CardDetails/CardDetails';

/**
 * Dashboard page component.
 *
 * Acts as the home screen for authenticated users, showing a profile summary,
 * collection statistics, and recently added cards. The page is intentionally
 * kept lightweight — the heavy data fetching (vault, statistics) is deferred
 * to their own dedicated pages.
 *
 * NOTE: `lastCards` is currently seeded with static mock data while the real
 * "recently added" endpoint is being developed. Replace with the API response
 * when available.
 */
export default function Dashboard() {
  // `useApi` handles the fetch lifecycle and exposes loading/error states so
  // we can guard renders without duplicating request logic here.
  const { loading, error } = useApi('/dashboard');
  const { isDark } = useTheme();

  // Tracks which card's detail panel is currently open; null means closed.
  const [selectedCard, setSelectedCard] = useState(null);

  // Show a single loading/error state that blocks the whole page so partial
  // renders with missing data don't confuse users.
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error : {error}</div>;

  // TODO: replace with real data from the API once the endpoint is ready.
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

      {/* Horizontal scroll list — each card is clickable to open the detail
          overlay, which lets users inspect info without leaving the page. */}
      <div className={styles.scrollWrapper}>
        {lastCards.map((card) => (
          <div
            key={card.id}
            className={styles.cardItem}
            onClick={() => handleOpenCard(card)}
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

      {/* Conditionally mount CardDetails only when a card is selected to
          avoid rendering a hidden overlay on every page load. */}
      {selectedCard && (
        <CardDetails
          card={selectedCard}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
}