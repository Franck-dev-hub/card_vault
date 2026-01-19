import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLinks } from './NavLinks';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Burger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-2 hover:bg-base-200 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-16 left-4 bg-base-100 border border-base-300 rounded-lg shadow-lg p-2 z-50 min-w-[200px]">
            <NavLinks onClick={() => setIsOpen(false)} className="flex flex-col" />
          </div>
        )}
      </div>
    </nav>
  );
};
