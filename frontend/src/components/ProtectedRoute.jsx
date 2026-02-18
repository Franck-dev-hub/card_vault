import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Afficher un loader pendant la vérification de l'authentification
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-400 to-purple-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Rediriger vers la landing page si non authentifié
    return <Navigate to="/" replace />;
  }

  return children;
};
