import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { BackgroundGradient } from '../components/ui/background-gradient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { loading, error } = useApi();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login with:', { email, password, rememberMe });
  };

  return (
    <div className="flex h-full items-center justify-center px-4 py-8">
      <BackgroundGradient className="rounded-3xl">
        <div className="card w-full max-w-96 bg-base-100 shadow-2xl border-2 border-gray-100 rounded-3xl">
          <div className="card-body px-8! py-10! md:px-16! md:py-12! bg-linear-to-bl from-blue-50 to-white rounded-3xl">
          {/*<h2 className="card-title text-2xl justify-center mb-4">Login</h2>*/}

          <form onSubmit={handleSubmit} className="w-full">
            {/* Email */}
            <div className="form-control w-full form-field-spacing">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control w-full form-field-spacing">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="grow"
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
                <span className="label-text">Remember me</span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 w-full form-field-spacing"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          {/* Sign Up Link */}
          <div className="text-center mt-4 w-full form-field-spacing">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/create-account" className="link link-primary">
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
