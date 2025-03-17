import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css'
import NavBar from "./assets/components/NavBar"
import Footer from "./assets/components/Footer"
import Home from "./assets/pages/Home";
import Menu from "./assets/pages/Menu";
import Contact from "./assets/pages/Contact";

function App() {

  return (
    <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Menu />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      <Footer />
    </Router>
  )
}

export default App
