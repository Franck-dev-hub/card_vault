import React from 'react';
import styles from '../css//Header.module.css';
import logoImg from '../../../../public/image/logo_card_vault.webp'

const Header = ({ isDark, setIsDark }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.logo}>
          <img src={logoImg} alt="Card Vault Logo" className={styles.logoImg} />
            <div className={styles.logoText}>
              <span className={styles.logoCard}>CARD</span>
              <span className={styles.logoVault}>VAULT</span>
            </div>
        </div>

        <div className={styles.actions}>
          <a href="/login" className={styles.loginBtn}>
            <span className={styles.loginText}>Login</span>
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;
