import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
