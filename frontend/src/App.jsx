import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './components/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Statistics from './pages/Statistics';
import Scan from './pages/Scan';
import Vault from './pages/Vault';
import Search from './pages/Search';
import './App.css';
import { MainLayout } from './components/Layout/MainLayout';

import { AboutLayout } from './pages/About/AboutLayout';
import { About } from './pages/About/About';
import { FAQ } from './pages/About/FAQ';
import { LegalNotices } from './pages/About/LegalNotices';
import { Terms } from './pages/About/Terms';
import { Confidentiality } from './pages/About/Confidentiality';
import { Cookies } from './pages/About/Cookies';
import { Contacts } from './pages/About/Contacts';

// ThemeProvider wraps everything so the theme is available throughout the
// entire tree before AuthProvider reads any stored user preferences.
// AuthProvider sits inside ThemeProvider but outside BrowserRouter so that
// auth state is accessible to route guards without being re-mounted on navigation.
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Root route: renders LandingPage for anonymous visitors and
                Dashboard (inside MainLayout) for authenticated users.
                HomePage handles the conditional rendering so neither page
                is mounted unnecessarily. */}
            <Route
              path="/"
              element={
                <HomePage
                  landing={<LandingPage />}
                  dashboard={
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  }
                />
              }
            />

            {/* Public routes — accessible without authentication */}
            <Route
              path="/login"
              element={
                <MainLayout>
                  <Login />
                </MainLayout>
              }
            />
            <Route
              path="/create-account"
              element={
                <MainLayout>
                  <CreateAccount />
                </MainLayout>
              }
            />

            {/* Nested /about routes share the AboutLayout shell via React Router's
                Outlet mechanism, avoiding code duplication across every about sub-page. */}
            <Route
              path="/about"
              element={
                <MainLayout>
                  <AboutLayout />
                </MainLayout>
              }
            >
              <Route index element={<About />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="terms" element={<Terms />} />
              <Route path="legal-notices" element={<LegalNotices />} />
              <Route path="confidentiality" element={<Confidentiality />} />
              <Route path="cookies" element={<Cookies />} />
              <Route path="contacts" element={<Contacts />} />
            </Route>

            {/* Protected routes — ProtectedRoute redirects unauthenticated
                users to /login before the child page ever mounts, preventing
                any data fetching or rendering for unauthorised visitors. */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Statistics />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/scan"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Scan />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vault"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Vault />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Search />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch-all: renders a 404 page for any unrecognised path so
                the user always gets meaningful feedback instead of a blank screen. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
