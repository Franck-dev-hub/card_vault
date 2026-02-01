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
        <div className="card w-full max-w-96 bg-white dark:bg-slate-800 shadow-2xl border-2 border-gray-100 dark:border-gray-700 rounded-3xl">
          <div className="card-body px-8! py-10! md:px-16! md:py-12! bg-gradient-to-bl from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl">
            {/*<h2 className="card-title text-2xl justify-center mb-4">Create Account</h2>*/}


          <form onSubmit={handleSubmit} className="w-full">
            {/* Username */}
            <div className="form-control w-full form-field-spacing">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">Username</span>
              </label>
              <label className="input input-bordered bg-white dark:bg-slate-700 dark:border-gray-600 flex items-center gap-2 w-full">
                <User size={18} className="text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="grow bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>


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
                <Lock size={18} className="text-gray-500 dark:text-gray-400" />
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  className="grow bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                <span className="label-text text-gray-700 dark:text-gray-300">Confirm Password</span>
              </label>
              <label className="input input-bordered bg-white dark:bg-slate-700 dark:border-gray-600 flex items-center gap-2 w-full">
                <Lock size={18} className="text-gray-500 dark:text-gray-400" />
                <input
                  type="password"
                  placeholder="Repeat your password"
                  className="grow bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            </div>


            {/* Error */}
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
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>


          {/* Link to Login */}
          <div className="text-center mt-4 w-full form-field-spacing">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary dark:text-blue-400">
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
