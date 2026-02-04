import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Dashboard.module.css';
import { CircleUserRound } from 'lucide-react';

export default function Dashboard() {
  const { loading, error } = useApi('/dashboard/');
  const { isDark } = useTheme();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error : {error}</div>;

  // Simulation de données (à remplacer par tes data d'API)
  const lastCards = [1, 2, 3, 4, 5, 6, 7, 8];

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
        {lastCards.map((card, index) => (
          <div key={index} className={styles.cardItem}>
            {/* Ici l'image de la carte */}
            <img 
              src="https://images.pokemontcg.io/base1/back.png" 
              alt="Pokemon Card Back" 
              className={styles.cardImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}