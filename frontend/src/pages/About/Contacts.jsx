import { useTheme } from '../../contexts/ThemeContext';
import './About.css';

/**
 * Contacts — contact information page for CardVault.
 *
 * Currently a stub ("Test ok") pending full content implementation.
 * The theme wrapper is already in place so the page will style correctly
 * once real contact details or a form are added.
 */
export const Contacts = () => {
  // Drives the light/dark CSS class on the wrapper so the eventual
  // contact form and text inherit the correct theme tokens.
  const { isDark } = useTheme();

  return (
    <div className={`about-page ${isDark ? 'dark' : 'light'}`}>
      <div className="about-container about-subpage">
        <div className="about-content">
          <h1>Contact Us</h1>
          <p>Test ok</p>
        </div>

        <footer className="about-footer">
          <p>© 2026 CardVault</p>
          <p>All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};
