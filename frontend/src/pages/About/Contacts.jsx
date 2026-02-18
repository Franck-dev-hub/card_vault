import { useTheme } from '../../contexts/ThemeContext';
import './About.css';

export const Contacts = () => {
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
