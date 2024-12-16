import React, { useState } from 'react';
import './Navbar.css';
// import logo from '../../assets/logo.svg'; 
// import searchIcon from '../../assets/search_icon.svg'; 
// import basketIcon from '../../assets/basket_icon.svg'; 

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      {/* <img src={logo} className='logo' alt="" /> */}
      <ul className="navbar-menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li>
        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
        <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li>
      </ul>
      <div className="navbar-right">
        {/* <img src={searchIcon} alt="Search Icon" /> */}
        <div className="navbar-search-icon">
          {/* <img src={basketIcon} alt="Basket Icon" /> */}
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default Navbar