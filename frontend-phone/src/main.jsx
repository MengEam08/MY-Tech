import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './assets/css/style.scss'
import { AdminAuthProvider } from './components/context/AdminAuth.jsx';
import { AuthProvider } from './components/context/Auth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      
    </AdminAuthProvider>
  </StrictMode>,
)
