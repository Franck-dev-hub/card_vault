import { useApi } from '../hooks/useApi';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { loading, error } = useApi('/dashboard/');

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error : {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Dashboard</h1>
      {/* Contenu du dashboard */}
      <div>
        <p>Welcome to your dashboard.</p>
      </div>
    </div>
  );
}
