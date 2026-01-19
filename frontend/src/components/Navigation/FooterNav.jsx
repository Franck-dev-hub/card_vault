import { NavLinks, NAV_ITEMS } from './NavLinks';

export const FooterNav = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 md:hidden">
      <div className="flex justify-around items-center py-3">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-base-200 rounded-lg transition-colors"
          >
            <item.icon size={20} />
            <span className="text-xs">{item.name}</span>
          </a>
        ))}
      </div>
    </footer>
  );
};
