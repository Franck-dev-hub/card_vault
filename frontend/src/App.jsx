import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Profile from './pages/Profile';
import Parameters from './pages/Parameters';
import LandingPage from './pages/LandingPage';
import Statistics from './pages/Statistics';
import Scan from './pages/Scan';
import './App.css';
import { MainLayout } from './components/Layout/MainLayout';

// ⬇️ AJOUTE CES IMPORTS
import { AboutLayout } from './pages/About/AboutLayout';
import { About } from './pages/About/About';
import { FAQ } from './pages/About/FAQ';
import { LegalNotices } from './pages/About/LegalNotices';
import { Terms } from './pages/About/Terms';
import { Confidentiality } from './pages/About/Confidentiality';
import { Cookies } from './pages/About/Cookies';
import { Contacts } from './pages/About/Contacts';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Route publique - Landing Page */}
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Routes publiques - Login et Create Account */}
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

            {/* ⬇️ ROUTES IMBRIQUÉES POUR /ABOUT */}
            <Route
              path="/about"
              element={
                <MainLayout>
                  <AboutLayout />
                </MainLayout>
              }
            >
              {/* Route par défaut : /about */}
              <Route index element={<About />} />
              
              {/* Routes enfants : /about/xxx */}
              <Route path="faq" element={<FAQ />} />
              <Route path="terms" element={<Terms />} />
              <Route path="legal-notices" element={<LegalNotices />} />
              <Route path="confidentiality" element={<Confidentiality />} />
              <Route path="cookies" element={<Cookies />} />
              <Route path="contacts" element={<Contacts />} />

            </Route>

            {/* Routes protégées - Nécessitent authentification */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
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
              path="/parameters"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Parameters />
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
            {/* Routes à activer plus tard quand les composants seront créés


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
              path="/research"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Research />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            */}

            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
