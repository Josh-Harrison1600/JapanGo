import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
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

//Wrapper component that will handle conditional rendering
function LayoutWrapper(){
  const location = useLocation();

  //check if current path starts with /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return(
    <>
      {!isAdminRoute && <NavBar />}
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

      {!isAdminRoute && <Footer />}
    </>
  );
}


function App() {

  return (
    <Router>
      <AuthProvider>
        <LayoutWrapper />
      </AuthProvider>
    </Router>
  );
}


export default App
