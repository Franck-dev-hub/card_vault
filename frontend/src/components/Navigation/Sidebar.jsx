import { Home, ClipboardList, Camera, Lock, Search } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Statistics', icon: ClipboardList, path: '/statistics' },
  { name: 'Scan', icon: Camera, path: '/scan' },
  { name: 'Vault', icon: Lock, path: '/vault' },
  { name: 'Research', icon: Search, path: '/research' },
];

export const Sidebar = ({ isOpen, onClose, activePath = '/dashboard' }) => {
  return (
    <>
      {/* Backdrop (fond sombre semi-transparent) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar qui glisse depuis la gauche */}
      <div
        className={`
          fixed left-0 top-0 h-screen w-72 bg-white
          transform transition-transform duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 p-4 pt-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activePath === item.path;
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-4 px-4 py-4
                  rounded-xl border border-gray-200
                  transition-all duration-200
                  ${isActive
                    ? 'bg-blue-100 border-blue-200'
                    : 'bg-white hover:bg-gray-50'
                  }
                `}
              >
                <Icon
                  size={24}
                  className="text-gray-700"
                  strokeWidth={1.5}
                />
                <span className="text-gray-800 font-medium text-base">
                  {item.name}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};
