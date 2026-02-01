import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Statistics.module.css';

export default function Statistics() {
  const { loading, error } = useApi('/statistics/');
  const { isDark } = useTheme();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}> 
      <h1 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}> 
        Statistics
      </h1>
      {/* Contenu des statistiques */}
      <div>
        <p className={isDark ? 'text-gray-200' : 'text-gray-800'}>
          Welcome to your statistics page.
        </p>
      </div>
    </div>
  );
}
