import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Components/LoginSignup.css'
import SignUp from './SignUp.jsx'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <App /> 
    </Router>
  </StrictMode>,
)
