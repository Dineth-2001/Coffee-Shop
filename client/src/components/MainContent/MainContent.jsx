// import React, { useContext } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from '../../pages/Home/Home';
// import About from '../../pages/About/About';
// import Contact from '../../pages/Contact/Contact';
// import Menu from '../../pages/Menu/Menu';
// import Cart from '../../pages/Cart/Cart';
// import PlaceOrder from '../../pages/PlaceOrder/PlaceOrder';
// import Login from '../Login/Login';
// import { AuthContext } from '../../contexts/AuthContext';

// const MainContent = () => {
//   const { showLogin, isAuthenticated } = useContext(AuthContext);

//   return (
//     <>
//       {showLogin && <Login />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/menu" element={<Menu isAuthenticated={isAuthenticated} />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/place-order" element={<PlaceOrder />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </>
//   );
// };

// export default MainContent;

import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Menu from '../../pages/Menu/Menu';
import Cart from '../../pages/Cart/Cart';
import PlaceOrder from '../../pages/PlaceOrder/PlaceOrder';
import Login from '../Login/Login';
import { AuthContext } from '../../contexts/AuthContext';

const MainContent = () => {
  const { showLogin } = useContext(AuthContext);

  return (
    <>
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default MainContent;