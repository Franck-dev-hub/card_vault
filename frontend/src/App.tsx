import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import CreateAccount from "./pages/Auth/CreateAccount/CreateAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
