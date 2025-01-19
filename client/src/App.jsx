// import React, {useState, useEffect} from "react";
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Home from './pages/Home/Home';
// import About from './pages/About/About';
// import Contact from './pages/Contact/Contact';
// import Menu from './pages/Menu/Menu';
// import Cart from './pages/Cart/Cart';
// import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
// import Login from "./components/Login/Login";
// import './App.css';
// import Footer from "./components/Footer/Footer";
// import useCart from "./hooks/useCart";

// function App() {

//   const [showLogin, setShowLogin] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { clearCart, setCartItems } = useCart();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("token");
//     clearCart();
//   };

//   return (
//     <>
//     <div className="App">
//       <Navbar setShowLogin={setShowLogin} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
//       {showLogin && <Login setShowLogin={setShowLogin} setIsAuthenticated={setIsAuthenticated} />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/menu" element={<Menu isAuthenticated={isAuthenticated} />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/cart" element={<Cart clearCart={clearCart} setCartItems={setCartItems}/>} />
//         <Route path="/place-order" element={<PlaceOrder />} />
//         <Route path="/login" element={<Login />} /> 
//       </Routes>
//     </div>
//     <Footer/>
//   </>
//   );
// }

// export default App;



// Code with the auth context:
import React from "react";
import Navbar from './components/Navbar/Navbar';
import MainContent from './components/MainContent/MainContent';
import './App.css';
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;