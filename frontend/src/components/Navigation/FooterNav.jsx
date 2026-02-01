import { Link, useLocation } from 'react-router-dom';
import { Home, ChartColumn, Camera, Lock, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';


const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Statistics', icon: ChartColumn, path: '/statistics' },
  { name: 'Scan', icon: Camera, path: '/scan' },
  { name: 'Vault', icon: Lock, path: '/vault' },
  { name: 'Research', icon: Search, path: '/research' },
];


export const FooterNav = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const currentPath = location.pathname === '/' ? '/dashboard' : location.pathname;


  return (
    <footer className={`
      shrink-0 md:hidden shadow-lg transition-colors duration-300
      ${isDark 
        ? 'bg-gradient-to-t from-gray-800 to-gray-900' 
        : 'bg-gradient-to-t from-blue-50 to-white'
      }
    `}>
      <div className="flex justify-around items-center px-4" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;


          return (
            <Link
              key={item.name}
              to={item.path}
              className="group flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200"
            >
              {/* Carré autour de l'icône */}
              <div className={`
                w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200
                ${isActive
                  ? isDark
                    ? 'bg-blue-900/30 ring-2 ring-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-blue-100 ring-2 ring-blue-400 shadow-lg shadow-blue-400/30'
                  : isDark
                    ? 'group-active:bg-gray-700 group-active:ring-2 group-active:ring-gray-600'
                    : 'group-active:bg-blue-50 group-active:ring-2 group-active:ring-blue-300'
                }
              `}>
                <Icon
                  size={40}
                  className={`
                    transition-all duration-200
                    ${isActive 
                      ? isDark 
                        ? 'text-blue-400' 
                        : 'text-blue-600' 
                      : isDark
                        ? 'text-gray-400 group-active:text-blue-400'
                        : 'text-gray-600 group-active:text-blue-600'
                    }
                  `}
                  strokeWidth={2}
                />
              </div>

              <span className={`
                text-xs font-semibold transition-all duration-200
                ${isActive
                  ? isDark
                    ? 'text-blue-400'
                    : 'text-blue-700'
                  : isDark
                    ? 'text-gray-300 group-active:text-blue-400'
                    : 'text-gray-800 group-active:text-blue-700'
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
