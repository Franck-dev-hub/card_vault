import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Camera, Lock, Search } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Statistics', icon: ClipboardList, path: '/statistics' },
  { name: 'Scan', icon: Camera, path: '/scan' },
  { name: 'Vault', icon: Lock, path: '/vault' },
  { name: 'Research', icon: Search, path: '/research' },
];

export const FooterNav = () => {
  const location = useLocation();
  const currentPath = location.pathname === '/' ? '/dashboard' : location.pathname;

  return (
    <footer className="shrink-0 bg-linear-to-t from-blue-50 to-white border-t-2 border-blue-200 md:hidden shadow-lg">
      <div className="flex justify-around items-center px-4" style={{ paddingTop: '20px', paddingBottom: '12px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="group flex flex-col items-center gap-1 px-3 py-2 transition-all duration-200"
            >
              <Icon
                size={22}
                className={`
                  transition-colors
                  ${isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}
                `}
                strokeWidth={2}
              />
              <span className={`
                text-xs font-semibold transition-colors
                ${isActive
                  ? 'text-blue-700'
                  : 'text-gray-800 group-hover:text-blue-700'
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
