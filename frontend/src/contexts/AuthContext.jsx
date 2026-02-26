import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '/api';
const AuthContext = createContext();

// Ensure cookies (session tokens) are always sent with cross-origin requests,
// which is required for server-side session management to work correctly.
axios.defaults.withCredentials = true;

/**
 * Custom hook that provides access to the authentication context.
 * Throws an error when called outside of AuthProvider to prevent silent
 * failures where auth state would simply be undefined.
 *
 * @returns {{ user, isAuthenticated, isLoading, register, login, logout }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Provides authentication state and actions to the entire component tree.
 * Centralising auth here avoids prop-drilling and ensures every consumer
 * always reads from a single source of truth.
 *
 * @param {{ children: React.ReactNode }} props
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Start as true so that child routes don't flash unauthenticated UI
  // before the session check has had a chance to complete.
  const [isLoading, setIsLoading] = useState(true);

  // Restore the session on mount so that a page refresh does not force
  // the user to log in again. localStorage is used because the backend
  // relies on a cookie-based session; the stored user_id only needs to
  // hydrate client-side state, not authenticate requests.
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (userId) {
          const username = localStorage.getItem('username');
          const email = localStorage.getItem('email');
          setUser({ id: userId, username, email });
          setIsAuthenticated(true);
        }
      } catch {
        // If anything goes wrong reading storage, treat the user as
        // unauthenticated rather than leaving the app in a broken state.
        setIsAuthenticated(false);
      } finally {
        // Always clear the loading flag so the UI can render regardless
        // of whether a session was found.
        setIsLoading(false);
      }
    };
    checkSession();
  }, []); // Empty dependency array — run once on mount only.

  /**
   * Creates a new account. Delegates all validation to the server so that
   * password rules and uniqueness checks are enforced in one place.
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} The server response payload.
   */
  const register = async (username, email, password) => {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  };

  /**
   * Authenticates the user and persists the session identifier locally.
   * Storing user_id in localStorage allows the auth state to survive
   * a full page reload without requiring a network round-trip.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} The server response payload.
   */
  const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    const { user_id } = response.data;
    localStorage.setItem('user_id', user_id);
    try {
      const meResponse = await axios.get(`${API_BASE_URL}/me`);
      const { username, email: userEmail } = meResponse.data;
      localStorage.setItem('username', username);
      localStorage.setItem('email', userEmail);
      setUser({ id: user_id, username, email: userEmail });
    } catch {
      setUser({ id: user_id });
    }
    setIsAuthenticated(true);
    return response.data;
  };

  /**
   * Ends the user session both on the server and on the client.
   * The finally block guarantees that local state is always cleared even
   * when the server-side logout request fails (e.g. network error), so
   * the user is never left in a phantom-authenticated state.
   *
   * @returns {Promise<void>}
   */
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
