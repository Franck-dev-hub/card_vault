import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ProtectedRoute} from "./components/auth/ProtectedRoute.tsx";

// Authentification
import LandingPage from "./pages/Landing/LandingPage";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

// Menu
import Stats from "./pages/Menu/Stats/Stats";

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
          <Route path="/stats" element={<ProtectedRoute><Stats/></ProtectedRoute>}/>

          {/* Fallback */}
          <Route path="*" element={<Error/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
