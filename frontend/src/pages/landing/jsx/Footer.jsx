import React from 'react';
import styles from '../css/Footer.module.css';

const Footer = () => {
  const year = new Date().getUTCFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© {year} Card Vault. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
