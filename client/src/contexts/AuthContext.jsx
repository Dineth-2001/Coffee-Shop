// import React, { createContext, useState, useEffect } from 'react';
// import useCart from '../hooks/useCart';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const { cartItems, setCartItems, clearCart } = useCart();

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
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleLogout, cartItems, setCartItems, clearCart, showLogin, setShowLogin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const {clearCart} = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    clearCart();
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleLogout, showLogin, setShowLogin }}>
      {children}
    </AuthContext.Provider>
  );
};