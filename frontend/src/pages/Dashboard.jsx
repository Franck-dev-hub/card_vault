import { useApi } from '../hooks/useApi';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { loading, error } = useApi('/dashboard/');

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>Erreur : {error}</div>;

  return (
    <div className={styles.container}>
      {/* Contenu du dashboard */}
    </div>
  );
}
