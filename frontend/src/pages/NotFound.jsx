import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

/**
 * 404 Not Found page component.
 *
 * Displayed by the router when no route matches the requested URL.
 * Uses the ThemeContext so the background gradient stays consistent with
 * the rest of the unauthenticated pages (e.g. LandingPage).
 */
const NotFound = () => {
  const navigate = useNavigate();
  // Read the current theme so the page background matches the app theme
  // even though this page lives outside the normal authenticated shell.
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-600 via-blue-400 to-purple-500"
      }`}
    >
      <h1 className="text-8xl font-extrabold text-white/20 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-white mb-4">Page not found</h2>
      <p className="text-white/60 mb-8 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      {/* Navigate programmatically instead of using a Link so the user lands
          on the real root route resolution rather than a hard-coded path. */}
      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        Back to home
      </button>
    </div>
  );
};

export default NotFound;
