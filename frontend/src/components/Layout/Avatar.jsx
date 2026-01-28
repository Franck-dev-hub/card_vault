import { Link } from 'react-router-dom';

export default function Avatar() {
  // TODO: Plus tard, vous remplacerez cette valeur par votre vrai état d'authentification
  // Par exemple : const { isAuthenticated } = useAuth();
  const isAuthenticated = false; // Pour l'instant, toujours false

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
          <span>A</span>
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {isAuthenticated ? (
          // Menu pour utilisateur connecté
          <>
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">Nouveau</span>
              </Link>
            </li>
            <li>
              <button onClick={() => console.log('Déconnexion...')}>
                Déconnexion
              </button>
            </li>
          </>
        ) : (
          // Menu pour utilisateur non connecté (menu actuel)
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/create-account">Create Account</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}