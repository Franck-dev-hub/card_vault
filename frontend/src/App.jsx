import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';
import { MainLayout } from './components/Layout/MainLayout';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
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