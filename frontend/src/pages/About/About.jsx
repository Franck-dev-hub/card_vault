// src/pages/About/About.jsx
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import './About.css';

export const About = () => {
  const { isDark } = useTheme();

  const menuItems = [
    { title: 'Legal notices', path: '/about/legal-notices' },
    { title: 'Terms and conditions', path: '/about/terms' },
    { title: 'Confidentiality', path: '/about/confidentiality' },
    { title: 'Cookies', path: '/about/cookies' },
    { title: 'FAQ', path: '/about/faq' },
    { title: 'Contacts', path: '/about/contacts' },
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <img 
          src="/image/logo_card_vault.png" 
          alt="Card Vault Logo" 
          className="about-logo"
        />
        <h1 className="about-title">Card Vault</h1>
      </div>

      <nav className="about-menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="about-menu-item"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <footer className="about-footer">
        <p>© 2026 CardVault</p>
        <p>All rights reserved</p>
      </footer>
    </div>
  );
};
