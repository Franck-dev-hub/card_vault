import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, UserPlus, User, Settings, Info } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Slide-in user menu panel (avatar drawer).
 *
 * @param {{ isOpen: boolean, onClose: Function, forceGuestMenu?: boolean }} props
 *   - `isOpen`         — controls the slide-in/out CSS animation.
 *   - `onClose`        — called when the backdrop or any menu action closes the panel.
 *   - `forceGuestMenu` — when true, renders the guest menu even for authenticated users.
 *                        Useful on public pages where the auth context is available but the
 *                        app intentionally shows the logged-out UI (e.g. landing page).
 */
export const UserMenu = ({ isOpen, onClose, forceGuestMenu = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { isDark } = useTheme();

  // Derived flag: forceGuestMenu overrides real auth state so the component
  // can be reused on pages that need a guest experience.
  const showAuthenticatedMenu = isAuthenticated && !forceGuestMenu;

  const handleLogout = () => {
    // Require explicit confirmation before calling logout to prevent accidental
    // sign-outs triggered by mis-clicks on a touch interface.
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      logout();
      navigate('/');
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop (semi-transparent dark background) - between navbar and footer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Menu that slides in from the right - between the navigation bar and footer */}
      <div
        className={`
          fixed right-0 top-33 bottom-20 w-80
          transform transition-all duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto rounded-tl-3xl rounded-bl-3xl border-l-2
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isDark
            ? 'bg-gradient-to-bl from-gray-800 to-gray-900 border-gray-700'
            : 'bg-gradient-to-bl from-blue-50 to-white border-blue-200'
          }
        `}
      >
        {/* Menu items */}
        <nav className="flex flex-col items-center gap-4 p-8 pb-16 h-full">
          <div className="h-4"></div>

          {showAuthenticatedMenu ? (
            <>
              {/* Menu for authenticated users */}

              {/* Profile */}
              <button
                onClick={() => {
                  navigate('/profile');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <User size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Profile</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => {
                  navigate('/settings');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Settings size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Settings</span>
              </button>

              {/* Buy me a tea */}
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={{
                  backgroundColor: isDark ? 'rgb(31 41 55)' : 'white',
                  borderColor: isDark ? 'rgb(5 150 105)' : 'rgb(167 243 208)',
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'hover:border-emerald-500 hover:bg-emerald-900/30'
                    : 'hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                <div
                  style={{
                    backgroundColor: isDark ? 'rgba(6, 78, 59, 0.5)' : 'rgb(209 250 229)',
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    isDark
                      ? 'group-hover:bg-emerald-800/50'
                      : 'group-hover:bg-emerald-200'
                  }`}
                >
                  <SiBuymeacoffee size={24} className="text-[#5f9b88]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-emerald-400' : 'text-gray-800 group-hover:text-emerald-600'}`}>Buy me a tea</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-indigo-700 hover:border-indigo-500 hover:bg-indigo-900/30'
                    : 'bg-white border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-indigo-900/50 group-hover:bg-indigo-800/50' : 'bg-indigo-100 group-hover:bg-indigo-200'}`}>
                  <FaDiscord size={24} className="text-[#5865F2]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-indigo-400' : 'text-gray-800 group-hover:text-indigo-600'}`}>Discord</span>
              </a>

              {/* About */}
              <button
                onClick={() => {
                  navigate('/about');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Info size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>About</span>
              </button>

              {/* Spacer to add a little space before logout */}
              <div className="h-60"></div>

              {/* Log Out: the spacer applies in mobile mode but not in desktop mode.*/}
              <button
                onClick={handleLogout}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-red-700 hover:border-red-500 hover:bg-red-900/30'
                    : 'bg-white border-red-100 hover:border-red-400 hover:bg-red-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-red-900/50 group-hover:bg-red-800/50' : 'bg-red-100 group-hover:bg-red-200'}`}>
                  <LogOut size={24} className="text-red-500" strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-red-400 group-hover:text-red-300' : 'text-red-600 group-hover:text-red-700'}`}>Log Out</span>
              </button>
            </>
          ) : (
            <>
              {/* Menu for unauthenticated users */}

              {/* Login */}
              <button
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <LogIn size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Login</span>
              </button>

              {/* Create Account */}
              <button
                onClick={() => {
                  navigate('/create-account');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <UserPlus size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>Create Account</span>
              </button>

              {/* Buy me a tea */}
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={{
                  backgroundColor: isDark ? 'rgb(31 41 55)' : 'white',
                  borderColor: isDark ? 'rgb(5 150 105)' : 'rgb(167 243 208)',
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'hover:border-emerald-500 hover:bg-emerald-900/30'
                    : 'hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                <div
                  style={{
                    backgroundColor: isDark ? 'rgba(6, 78, 59, 0.5)' : 'rgb(209 250 229)',
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    isDark
                      ? 'group-hover:bg-emerald-800/50'
                      : 'group-hover:bg-emerald-200'
                  }`}
                >
                  <SiBuymeacoffee size={24} className="text-[#FFDD00]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-emerald-400' : 'text-gray-800 group-hover:text-emerald-600'}`}>Buy me a tea</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-indigo-700 hover:border-indigo-500 hover:bg-indigo-900/30'
                    : 'bg-white border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-indigo-900/50 group-hover:bg-indigo-800/50' : 'bg-indigo-100 group-hover:bg-indigo-200'}`}>
                  <FaDiscord size={24} className="text-[#5865F2]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-indigo-400' : 'text-gray-800 group-hover:text-indigo-600'}`}>Discord</span>
              </a>

              {/* About */}
              <button
                onClick={() => {
                  navigate('/about');
                  onClose();
                }}
                className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                  <Info size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} strokeWidth={2} />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'}`}>About</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};
