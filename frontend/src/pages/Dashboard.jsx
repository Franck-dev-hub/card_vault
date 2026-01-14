import { useApi } from '../hooks/useApi';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { data: dashboardData, loading, error } = useApi('/dashboard/');

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>Erreur : {error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {dashboardData?.title || 'Dashboard'}
        </h1>
      </header>
    </div>
  );
}