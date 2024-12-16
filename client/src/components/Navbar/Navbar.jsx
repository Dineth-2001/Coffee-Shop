import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {assets} from '../../assets/assets';

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' alt="" />
      <ul className="navbar-menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
          <Link to="/menu">Menu</Link>
        </li>
        <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>
          <Link to="/mobile-app">Mobile App</Link>
        </li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;




// import React, { useState } from 'react';
// import './Navbar.css';
// import logo from '../../assets/logo.jpg'; 
// // import searchIcon from '../../assets/search_icon.svg'; 
// // import basketIcon from '../../assets/basket_icon.svg'; 

// const Navbar = () => {
//   const [menu, setMenu] = useState("home");

//   return (
//     <div className='navbar'>
//       <img src={logo} className='logo' alt="" />
//       <ul className="navbar-menu">
//         <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
//         <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
//         <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</li>
//         <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
//       </ul>
//       <div className="navbar-right">
//         {/* <img src={searchIcon} alt="Search Icon" /> */}
//         <div className="navbar-search-icon">
//           {/* <img src={basketIcon} alt="Basket Icon" /> */}
//           <div className="dot"></div>
//         </div>
//         <button>Sign In</button>
//       </div>
//     </div>
//   );
// };

// export default Navbar