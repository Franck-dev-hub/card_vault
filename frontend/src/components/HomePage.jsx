import { useAuth } from '../contexts/AuthContext';

/**
 * Root-level page switcher that delegates rendering to either the landing page
 * or the dashboard based on the user's authentication state.
 *
 * Accepting both views as props keeps routing logic in the parent and allows
 * each view to be independently lazy-loaded without touching this component.
 *
 * @param {{ landing: React.ReactNode, dashboard: React.ReactNode }} props
 */
export const HomePage = ({ landing, dashboard }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a spinner while the auth context resolves the session to prevent a
  // visible flash where the landing page renders briefly for an already-authenticated user.
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-400 to-purple-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? dashboard : landing;
};
