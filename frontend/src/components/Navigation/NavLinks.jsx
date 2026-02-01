import { Home, ChartColumn, Camera, Vault, Search } from 'lucide-react';

export const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Statistics', icon: ChartColumn, path: '/statistics' },
  { name: 'Scan', icon: Camera, path: '/scan' },
  { name: 'Vault', icon: Vault, path: '/vault' },
  { name: 'Research', icon: Search, path: '/research' },
];

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