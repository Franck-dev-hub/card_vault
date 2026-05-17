import { Home, ChartColumn, Camera, Vault, Search, X } from "lucide-react";

// Local copy — Sidebar does not export NAV_ITEMS because its styling
// differs from the shared NavLinks component.
const NAV_ITEMS = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Statistics", icon: ChartColumn, path: "/statistics" },
  { name: "Scan", icon: Camera, path: "/scan" },
  { name: "Vault", icon: Vault, path: "/vault" },
  { name: "Search", icon: Search, path: "/search" },
];

/**
 * Off-canvas sidebar that slides in from the left.
 *
 * @param {{ isOpen: boolean, onClose: Function }} props
 *   - `isOpen`   — controls the slide-in/out animation via CSS translate.
 *   - `onClose`  — called when the backdrop or close button is clicked.
 */
export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Semi-transparent backdrop sits below the sidebar (z-40) but above
          page content, so clicking outside closes the menu without interacting
          with the page underneath. */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel — z-50 keeps it above the backdrop.
          translate-x toggling drives the slide animation without
          unmounting the DOM node, which avoids re-mount flicker. */}
      <div
        className={`
          fixed left-0 top-0 h-screen w-72 bg-white
          transform transition-transform duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button in the top-right corner of the panel */}
        <div className="flex items-center justify-end p-4 pt-6">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Navigation links — clicking any link also closes the sidebar */}
        <nav className="flex flex-col gap-3 px-6 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.path}
                onClick={onClose}
                className="btn btn-xl rounded-xl justify-start gap-4 border border-gray-200 bg-white hover:bg-gray-50 mx-2"
              >
                <Icon size={24} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-gray-800 font-medium">{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};
