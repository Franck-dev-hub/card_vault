import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Profile from './pages/Profile';
import './App.css';
import { MainLayout } from './components/Layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/profile" element={<Profile />} />
          {/* Routes à activer plus tard quand les composants seront créés
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/research" element={<Research />} />
          */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;