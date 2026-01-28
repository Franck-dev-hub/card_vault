import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { BackgroundGradient } from '../components/ui/background-gradient';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation basique
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Reset l'erreur
    setError('');

    // Ici tu appelleras ton API plus tard
    console.log('Creating account:', { username, email, password });
  };

  return (
    <div className="flex h-full items-center justify-center px-4 py-8">
      <BackgroundGradient className="rounded-3xl">
        <div className="card w-full max-w-96 bg-linear-to-bl from-blue-50 to-white rounded-3xl">
          <div className="card-body px-8! py-10! md:px-16! md:py-12!">
            {/*<h2 className="card-title text-2xl justify-center mb-4">Create Account</h2>*/}

          <form onSubmit={handleSubmit} className="w-full">
            {/* Username */}
            <div className="form-control w-full form-field-spacing">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="grow"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>

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
                  placeholder="At least 6 characters"
                  className="grow"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </label>
            </div>

            {/* Confirm Password */}
            <div className="form-control w-full form-field-spacing">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="Repeat your password"
                  className="grow"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Link to Login */}
          <div className="text-center mt-4 w-full form-field-spacing">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary">
                Log in
              </Link>
            </p>
          </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}

