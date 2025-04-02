import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import './App.css'
import NavBar from "./assets/components/NavBar"
import Footer from "./assets/components/Footer"
import Home from "./assets/pages/Home";
import Menu from "./assets/pages/Menu";
import Contact from "./assets/pages/Contact";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin imports
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import LoginPage from './admin/pages/Login';
import DashboardPage from './admin/pages/Dashboard';
import MenuAdminPage from './admin/pages/MenuAdminPage';
import AdminLayout from './admin/components/AdminLayout';
import Hours from './admin/pages/Hours';
import VerifyEmailCode from './admin/pages/VerifyEmailCode';

//Wrapper component that will handle conditional rendering
function LayoutWrapper(){
  const location = useLocation();

  //check if current path starts with /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return(
    <>
      {/* if the current path is not /admin, render the NavBar and Footer */}
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Menu />} />
        <Route path="/contact-us" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/verify" element={<VerifyEmailCode />} />

        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="menu" element={<MenuAdminPage />} />
          <Route path="hours" element={<Hours />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
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


export default App;
