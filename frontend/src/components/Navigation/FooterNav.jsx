import { Link, useLocation } from 'react-router-dom';
import { Home, ChartColumn, Camera, Vault, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Defined outside the component so the array is not re-created on every render.
// FooterNav does not expose labels — icon-only tabs keep the bar compact on small screens.
const NAV_ITEMS = [
  { icon: Home, path: '/dashboard' },
  { icon: ChartColumn, path: '/statistics' },
  { icon: Camera, path: '/scan' },
  { icon: Vault, path: '/vault' },
  { icon: Search, path: '/search' },
];

export const FooterNav = () => {
  const location = useLocation();
  const { isDark } = useTheme();

  // Treat the root path as /dashboard so the Home icon stays highlighted
  // when the user is redirected there after login.
  const currentPath = location.pathname === '/' ? '/dashboard' : location.pathname;

  return (
    // md:hidden hides the footer nav on desktop where the sidebar takes over navigation.
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
              {/* Neumorphic button: inset shadow when active (pressed look),
                  outer shadow when inactive (raised look). */}
              <div className={`
                w-[58px] h-[58px] rounded-[12px] flex items-center justify-center
                ${isDark
                  ? isActive
                    ? 'bg-[#667EEA] shadow-none text-[#18181B]'
                    : 'bg-[#18181B] shadow-[inset_1px_1px_2px_#ffffff40,1px_1px_1px_#000000] text-gray-500'
                  : isActive
                    ? 'bg-[#E0E8FF] shadow-none text-[#000000]'
                    : 'bg-[#F5F5F5] shadow-[inset_1px_1px_2px_#E0E0E040,1px_1px_1px_#00000040] text-gray-600'
                }
              `}>
                <Icon
                  size={29}
                  className="transition-transform duration-200 active:scale-90"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>

              {/* Optional label — currently undefined in NAV_ITEMS (icon-only design).
                  Add a `name` field to NAV_ITEMS to display labels. */}
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
