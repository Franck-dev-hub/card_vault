import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {ProtectedRoute} from "./components/auth/ProtectedRoute.tsx";

// Authentication
import LandingPage from "./pages/Landing/LandingPage";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

// Menu
import Dashboard from "./pages/Menu/Dashboard/Dashboard";
import Stats from "./pages/Menu/Stats/Stats";
import Scan from "./pages/Menu/Scan/Scan";
import Vault from "./pages/Menu/Vault/Vault";
import Search from "./pages/Menu/Search/Search";

// Settings
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Settings/Profile";

// About (Settings/About)
import {AboutLayout} from "./pages/Settings/About/AboutLayout";
import {About} from "./pages/Settings/About/About";
import {LegalNotices} from "./pages/Settings/About/LegalNotices";
import {Terms} from "./pages/Settings/About/Terms";
import {Confidentiality} from "./pages/Settings/About/Confidentiality";
import {Cookies} from "./pages/Settings/About/Cookies";
import {FAQ} from "./pages/Settings/About/FAQ";
import {Contacts} from "./pages/Settings/About/Contacts";

// Misc
import Error from "./pages/Errors/NotFound";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/stats" element={<ProtectedRoute><Stats/></ProtectedRoute>}/>
            <Route path="/scan" element={<ProtectedRoute><Scan/></ProtectedRoute>}/>
            <Route path="/vault" element={<ProtectedRoute><Vault/></ProtectedRoute>}/>
            <Route path="/search" element={<ProtectedRoute><Search/></ProtectedRoute>}/>
            <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
            <Route path="/settings/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

            {/* About — shared layout for all sub-pages */}
            <Route path="/about" element={<AboutLayout/>}>
              <Route index element={<About/>}/>
              <Route path="legal-notices" element={<LegalNotices/>}/>
              <Route path="terms" element={<Terms/>}/>
              <Route path="confidentiality" element={<Confidentiality/>}/>
              <Route path="cookies" element={<Cookies/>}/>
              <Route path="faq" element={<FAQ/>}/>
              <Route path="contacts" element={<Contacts/>}/>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Error/>}/>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;