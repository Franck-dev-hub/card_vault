import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Guards routes that require authentication.
 *
 * Shows a full-screen spinner while the auth state is being resolved on initial
 * mount to prevent a premature redirect before the async session check completes.
 * Unauthenticated users are sent to "/" with `replace` so the protected route
 * is never left in the browser history stack.
 *
 * @param {{ children: React.ReactNode }} props
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Block rendering until the async session verification finishes.
  // Without this, `isAuthenticated` would briefly be false on page refresh,
  // incorrectly redirecting an already logged-in user.
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

  // `replace` avoids polluting history: if the user was deep-linked to a protected
  // route while logged out, they land on "/" cleanly instead of being able to
  // navigate "back" to a route they are not allowed to see.
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
