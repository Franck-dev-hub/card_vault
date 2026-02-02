import { Link, useLocation } from 'react-router-dom';
import { Home, ChartColumn, Camera, Vault, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const NAV_ITEMS = [
  { icon: Home, path: '/dashboard' },
  { icon: ChartColumn, path: '/statistics' },
  { icon: Camera, path: '/scan' },
  { icon: Vault, path: '/vault' },
  { icon: Search, path: '/research' },
];

export const FooterNav = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const currentPath = location.pathname === '/' ? '/dashboard' : location.pathname;

  return (
    <footer className={`
      shrink-0 md:hidden transition-colors duration-300 border-t
      ${isDark 
        ? 'bg-[#1a1b1e] border-gray-800' 
        : 'bg-[#f0f2f5] border-gray-200'
      }
    `}>
      <div className="flex justify-around items-center px-2 py-3!">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 transition-all duration-200"
            >
              {/* Le bouton Neumorphique */}
              <div className={`
                w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300
                ${isDark 
                  ? isActive
                    ? 'bg-[#1a1b1e] shadow-[inset_4px_4px_8px_#0d0d0f,inset_-4px_-4px_8px_#27292d] text-blue-500' 
                    : 'bg-[#1a1b1e] shadow-[6px_6px_12px_#0d0d0f,-6px_-6px_12px_#27292d] text-gray-500'
                  : isActive
                    ? 'bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] text-purple-400'
                    : 'bg-[#f0f2f5] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] text-gray-600'
                }
              `}>
                <Icon
                  size={40}
                  className="transition-transform duration-200 active:scale-90"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>

              {/* Label optionnel (peut être masqué pour coller à tes images) */}
              <span className={`
                text-[10px] font-medium mt-1
                ${isActive 
                  ? isDark ? 'text-blue-400' : 'text-blue-600'
                  : 'text-gray-500'
                }
              `}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};