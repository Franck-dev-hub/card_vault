import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode is kept in all environments to surface side-effects from
// impure renders and deprecated API usage early, including in production
// builds where it has zero runtime cost.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
