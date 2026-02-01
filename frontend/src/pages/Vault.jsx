import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Vault.module.css';

export default function Vault() {
  const { loading, error } = useApi('/vault/');
  const { isDark } = useTheme();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}> 
      <h1 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}> 
        Vault
      </h1>
      {/* Contenu du vault */}
      <div>
        <p className={isDark ? 'text-gray-200' : 'text-gray-800'}>
          Welcome to your vault page.
        </p>
      </div>
    </div>
  );
}
