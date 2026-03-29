import {Navigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
  const {user, isLoading} = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>; // Ou un spinner
  }

  if (!user) {
    return <Navigate replace to="/"/>;
  }

  return <>{children}</>;
};