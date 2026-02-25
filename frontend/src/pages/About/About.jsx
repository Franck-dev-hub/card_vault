// src/pages/About/About.jsx
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import './About.css';

/**
 * About page — serves as the main entry point for all legal and informational
 * sub-pages (legal notices, terms, privacy, cookies, FAQ, contacts).
 *
 * The menu items are defined as static data inside the component because they
 * never change at runtime; keeping them co-located avoids an unnecessary
 * import or context lookup.
 */
export const About = () => {
  // isDark is consumed here so the parent wrapper can apply the correct theme
  // class; the actual className is set on the layout level (AboutLayout),
  // but individual pages may also need it for conditional styling.
  const { isDark } = useTheme();

  // Static navigation structure for the About section.
  // Defined inside the component so it stays close to the JSX that consumes it,
  // and because it has no side-effects that would justify lifting it out.
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
          src="/image/logo_card_vault.webp"
          alt="Card Vault Logo"
          className="about-logo"
        />
        <h1 className="about-title">Card Vault</h1>
      </div>

      {/* Render each legal/info section as an accessible navigation landmark */}
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
