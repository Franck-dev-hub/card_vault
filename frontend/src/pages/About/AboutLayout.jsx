// src/pages/About/AboutLayout.jsx
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './About.css';

/**
 * AboutLayout — shared shell for every route nested under /about/*.
 *
 * By wrapping all About sub-pages in a single layout route, we avoid
 * duplicating the theme-aware wrapper in each individual page component.
 * React Router's <Outlet> renders the matched child route in place, so
 * any page registered under this layout automatically inherits the theme
 * class without any additional setup.
 */
export const AboutLayout = () => {
  // The isDark flag drives the CSS class applied to the wrapper div,
  // enabling global theme switching via CSS custom properties defined in About.css.
  const { isDark } = useTheme();

  return (
    <div className={`about-page ${isDark ? 'dark' : 'light'}`}>
      {/* Child route content is injected here by React Router */}
      <Outlet />
    </div>
  );
};
