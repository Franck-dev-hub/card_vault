// src/pages/About/AboutLayout.jsx
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './About.css';

export const AboutLayout = () => {
  const { isDark } = useTheme();

  return (
    <div className={`about-page ${isDark ? 'dark' : 'light'}`}>
      {/* Le contenu des pages enfants s'affichera ici via Outlet */}
      <Outlet />
    </div>
  );
};
