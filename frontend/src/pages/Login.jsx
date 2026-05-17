import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Vault } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { BackgroundGradient } from '../components/ui/background-gradient';

/**
 * Login page component.
 *
 * Renders the sign-in form and delegates authentication to the AuthContext so
 * that session management (token storage, user state) stays centralised and
 * does not bleed into page-level logic.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // rememberMe is tracked in local state; it will be forwarded to the auth
  // layer once the "remember me" persistence feature is implemented.
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  // Separate error state (vs. form state) so the UI can reset the message
  // independently of the field values.
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles form submission.
   *
   * Prevents the native browser POST, calls the auth context's login method,
   * and redirects to the dashboard on success. Any server-side error message
   * is surfaced from the FastAPI `detail` field so users see a meaningful
   * reason for failure instead of a generic string.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Clear a previous error so the alert disappears while the new request
    // is in-flight rather than persisting stale feedback.
    setError(null);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // FastAPI returns validation/auth errors inside `detail`; fall back to a
      // generic message so the UI never shows an empty string.
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center px-4 py-8">
      <BackgroundGradient className="rounded-3xl">
        <div className="card w-full max-w-96 bg-white dark:bg-slate-800 shadow-2xl border-2 border-gray-100 dark:border-gray-700 rounded-3xl">
          <div className="card-body px-8! py-10! md:px-16! md:py-12! bg-gradient-to-bl from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl">

          <form onSubmit={handleSubmit} className="w-full">
            {/* Email */}
            <div className="form-control w-full form-field-spacing">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">Email</span>
              </label>
              <label className="input input-bordered bg-white dark:bg-slate-700 dark:border-gray-600 flex items-center gap-2 w-full">
                <Mail size={18} className="text-gray-500 dark:text-gray-400" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="grow bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control w-full form-field-spacing">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">Password</span>
              </label>
              <label className="input input-bordered bg-white dark:bg-slate-700 dark:border-gray-600 flex items-center gap-2 w-full">
                <Vault size={18} className="text-gray-500 dark:text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="grow bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Remember Me */}
            <div className="form-control w-full form-field-spacing">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="label-text text-gray-700 dark:text-gray-300">Remember me</span>
              </label>
            </div>

            {/* Only render the alert when there is an actual error to avoid an
                empty block occupying vertical space in the happy path. */}
            {error && (
              <div className="alert alert-error mt-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full mt-4! bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Submit'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-4 w-full form-field-spacing">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/create-account" className="link link-primary dark:text-blue-400">
                Create account
              </Link>
            </p>
          </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}
