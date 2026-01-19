import { LayoutDashboard, BarChart3, Search, Lock, Microscope } from 'lucide-react';

export const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Statistics', icon: BarChart3, path: '/statistics' },
  { name: 'Scan', icon: Search, path: '/scan' },
  { name: 'Vault', icon: Lock, path: '/vault' },
  { name: 'Research', icon: Microscope, path: '/research' },
];

export const NavLinks = ({ className = '', onClick }) => {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.name}
          href={item.path}
          onClick={onClick}
          className={`flex items-center gap-2 px-4 py-2 hover:bg-primary hover:text-primary-content rounded-lg transition-colors ${className}`}
        >
          <item.icon size={20} />
          <span>{item.name}</span>
        </a>
      ))}
    </>
  );
};
