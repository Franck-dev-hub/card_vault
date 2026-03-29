import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ProtectedRoute} from "./components/auth/ProtectedRoute.tsx";

import LandingPage from "./pages/Landing/LandingPage";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import Error from "./pages/Errors/NotFound";
import Dashboard from "./pages/Menu/Dashboard/Dashboard";

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

          {/* Fallback */}
          <Route path="*" element={<Error/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;