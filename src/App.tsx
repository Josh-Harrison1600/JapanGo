import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css'
import NavBar from "./assets/components/NavBar"
import Footer from "./assets/components/Footer"
import Home from "./assets/pages/Home";
import Menu from "./assets/pages/Menu";
import Contact from "./assets/pages/Contact";

// Admin imports
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './admin/ProtectedRoute';
import LoginPage from './admin/Login';
import DashboardPage from './admin/Dashboard';

function App() {

  return (
    <Router>
      <AuthProvider>
      <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Menu />} />
          <Route path="/contact-us" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              // <ProtectedRoute>
                <DashboardPage />
              // </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}


export default App
