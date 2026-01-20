import { Home, ClipboardList, Camera, Lock, Search } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Statistics', icon: ClipboardList, path: '/statistics' },
  { name: 'Scan', icon: Camera, path: '/scan' },
  { name: 'Vault', icon: Lock, path: '/vault' },
  { name: 'Research', icon: Search, path: '/research' },
];

export const FooterNav = ({ activePath = '/dashboard' }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center py-2 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activePath === item.path;
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.path}
              className={`
                flex flex-col items-center gap-1 px-3 py-2
                rounded-xl border transition-all duration-200
                ${isActive
                  ? 'bg-blue-100 border-blue-200'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <Icon
                size={20}
                className="text-gray-700"
                strokeWidth={1.5}
              />
              <span className="text-xs text-gray-800 font-medium">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </footer>
  );
};
