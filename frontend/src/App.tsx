import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ProtectedRoute} from "./components/auth/ProtectedRoute.tsx";

// Authentification
import LandingPage from "./pages/Landing/LandingPage";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

// Menu
import Dashboard from "./pages/Menu/Dashboard/Dashboard";
import Stats from "./pages/Menu/Stats/Stats";
import Scan from "./pages/Menu/Scan/Scan";
import Vault from "./pages/Menu/Vault/Vault";
import Search from "./pages/Menu/Search/Search";

// Misc
import Error from "./pages/Errors/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Common routes */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/stats" element={<ProtectedRoute><Stats/></ProtectedRoute>}/>
          <Route path="/scan" element={<ProtectedRoute><Scan/></ProtectedRoute>}/>
          <Route path="/vault" element={<ProtectedRoute><Vault/></ProtectedRoute>}/>
          <Route path="/search" element={<ProtectedRoute><Search/></ProtectedRoute>}/>

          {/* Fallback */}
          <Route path="*" element={<Error/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
