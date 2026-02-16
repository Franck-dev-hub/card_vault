// src/components/Footer/CopyrightFooter.jsx
import { useTheme } from '../../contexts/ThemeContext';

export const CopyrightFooter = () => {
  const { isDark } = useTheme();

  return (
    <div className={`
      text-center py-4 border-t-2 transition-colors duration-300
      ${isDark 
        ? 'bg-gray-900 border-gray-700 text-gray-400' 
        : 'bg-white border-gray-200 text-gray-600'
      }
    `}>
      <p className="text-sm">© 2026 CardVault</p>
      <p className="text-xs mt-1">All rights reserved</p>
    </div>
  );
};
