import React from 'react';
import {
  ChevronRight,
  Search,
  Database,
  Camera,
  BarChart3,
  ShieldCheck,
  Info,
  Github,
  Linkedin
} from 'lucide-react';
import styles from './Body.module.css';
import logoImg from '../../../public/image/logo_card_vault.webp';

const Body = () => {
  return (
    <main className={styles.hero}>
      <div className={styles.content}>

        {/* --- Hero Section --- */}
        <img src={logoImg} alt="Card Vault Logo" className={styles.logoImg} />
        <h1 className={styles.title}>
          Your collection,<br />
          <span className={styles.gradientText}>your Vault.</span>
        </h1>

        <p className={styles.description}>
          Scan, collect and track your TCG cards in one place.
        </p>

        <div className={styles.registerGroup}>
          <a href="/create-account" className={styles.registerBtn}>
            <span className={styles.registerText}>
              Get started <ChevronRight size={20} />
            </span>
          </a>
        </div>

        {/* --- Features Section --- */}
        <section className={styles.featureSection}>
           <h2 className={styles.h2Title}>Key feature</h2>
          <div className={styles.grid}>

            {/* Search */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Search className={styles.icon} />
                <h3>Search</h3>
              </div>
              <p>Explore thousands of cards from every set.</p>
            </div>

            {/* Vault */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Database className={styles.icon} />
                <h3>Vault</h3>
              </div>
              <p>Your secure personal digital collection.</p>
            </div>

            {/* Scan */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Camera className={styles.icon} />
                <h3>Scan</h3>
              </div>
              <p>Instant card recognition using your camera.</p>
            </div>

            {/* Statistics */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <BarChart3 className={styles.icon} />
                <h3>Statistics</h3>
              </div>
              <p>Track your collection value in real-time.</p>
            </div>

            {/* Licenses */}
            <div className={`${styles.card} ${styles.wideCard}`}>
              <div className={styles.cardHeader}>
                <ShieldCheck className={styles.icon} />
                <h3>Licenses</h3>
              </div>
              <p>Official data for Pokémon, Magic.</p>
            </div>

          </div>
        </section>

          <h2 className={styles.h2Title}>About the project</h2>

        {/* --- About & team section --- */}
        <section className={styles.aboutSection}>

          {/* About project */}
          <div className={styles.projectCard}>
            <div className={styles.aboutHeader}>
              <Info className={styles.icon} />
              <h3>The Project</h3>
            </div>
            <p>
              Card Vault was designed to simplify the management of your TCG card collection
              by bringing multiple licenses together in one place.
            </p>
            <p>
              You can integrate all your licenses into a single application, allowing you to
              easily centralize your entire collection. With the ability to scan your cards
              using your device’s camera, adding new cards becomes quick and effortless.
            </p>
          </div>

          <h2 className={styles.h2Title}>The Team</h2>

          {/* About Devs */}
          <div className={styles.devContainer}>
            {/* Dev 1 */}
            <div className={styles.devCard}>
              <img
                src="https://github.com/Franck-dev-hub.png"
                alt="Franck"
                className={styles.devPhoto}
              />
              <div className={styles.devInfo}>
                <h4>Franck S.</h4>
                <p className={styles.devRole}>Lead dev / Infra / DevOps / Machine Learning</p>
                <div className={styles.devLinks}>
                  <a href="https://github.com/Franck-dev-hub" target="_blank" rel="noreferrer">
                    <Github size={24} />
                  </a>
                  <a href="https://linkedin.com/in/franck-spadotto" target="_blank" rel="noreferrer">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Dev 2 */}
            <div className={styles.devCard}>
              <img
                src="https://github.com/N-Haitu31.png"
                alt="Haitu"
                className={styles.devPhoto}
              />
              <div className={styles.devInfo}>
                <h4>Haitu N.</h4>
                <p className={styles.devRole}>Frontend Developer</p>
                <div className={styles.devLinks}>
                  <a href="https://github.com/N-Haitu31" target="_blank" rel="noreferrer">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/haitu-nguyen-76941638b/" target="_blank" rel="noreferrer">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Dev 3 */}
            <div className={styles.devCard}>
              <img
                src="https://github.com/JeremyLrs.png"
                alt="Jeremy"
                className={styles.devPhoto}
              />
              <div className={styles.devInfo}>
                <h4>Jérémy L.</h4>
                <p className={styles.devRole}>Backend Developer</p>
                <div className={styles.devLinks}>
                  <a href="https://github.com/JeremyLrs" target="_blank" rel="noreferrer">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/jeremylrs" target="_blank" rel="noreferrer">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Body;
