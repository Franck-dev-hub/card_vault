import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Button that toggles between light and dark themes.
 *
 * The icon displayed is the opposite of the current theme — Sun in dark mode
 * (click to switch to light) and Moon in light mode (click to switch to dark) —
 * so the icon always communicates the action, not the current state.
 * Theme state lives in ThemeContext, keeping this component free of local state.
 */
export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
      aria-label="Toggle dark mode"
    >
      {/* Show Sun in dark mode so the user knows clicking will switch to light */}
      {isDark ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}
