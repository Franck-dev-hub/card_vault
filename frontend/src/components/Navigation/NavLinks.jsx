import { Home, ChartColumn, Camera, Vault, Search } from 'lucide-react';

// Exported so other components (e.g. Sidebar, Navbar) can share the same
// navigation structure without duplicating the list.
export const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Statistics', icon: ChartColumn, path: '/statistics' },
  { name: 'Scan', icon: Camera, path: '/scan' },
  { name: 'Vault', icon: Vault, path: '/vault' },
  { name: 'Search', icon: Search, path: '/search' },
];

/**
 * Renders the shared navigation link list used in both the Sidebar and Navbar.
 *
 * @param {{ className?: string, onClick?: Function, isSidebar?: boolean }} props
 *   - `className`  — extra Tailwind classes merged onto each link.
 *   - `onClick`    — called when any link is clicked (e.g. to close a drawer).
 *   - `isSidebar`  — when true, applies larger text and white colour for the
 *                    sidebar's dark background.
 */
export const NavLinks = ({ className = '', onClick, isSidebar = false }) => {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.name}
          href={item.path}
          onClick={onClick}
          className={`
            flex items-center gap-2 px-4 py-2
            hover:bg-primary hover:text-primary-content
            rounded-lg transition-colors
            ${isSidebar ? 'text-white text-lg' : ''}
            ${className}
          `}
        >
          <item.icon size={isSidebar ? 24 : 20} />
          <span>{item.name}</span>
        </a>
      ))}
    </>
  );
};
