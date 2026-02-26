import { Link } from 'react-router-dom';

/**
 * Dropdown avatar button with context-sensitive navigation links.
 *
 * NOTE: `isAuthenticated` is hard-coded to `false` as a placeholder.
 * Replace with `const { isAuthenticated } = useAuth()` once this component
 * is fully wired to the authentication context.
 *
 * The dropdown uses DaisyUI's CSS `:focus-within` approach — no JS
 * click-outside logic is needed.
 */
export default function Avatar() {
  // TODO: Replace with `const { isAuthenticated } = useAuth();`
  const isAuthenticated = false; // Placeholder — always renders the guest menu

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
          <span>A</span>
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {isAuthenticated ? (
          // Authenticated menu: profile access and logout action
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
          // Guest menu: entry points to login and account creation
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/create-account">Create Account</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}