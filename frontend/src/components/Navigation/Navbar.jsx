import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-base-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Burger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-2 hover:bg-base-200 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Sidebar qui glisse depuis la gauche */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
