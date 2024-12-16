import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={assets.logo} className='logo' alt="Logo" />
      </div>
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
        <li onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} className="navbar-icon search-icon" alt="Search" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} className="navbar-icon basket-icon" alt="Basket" />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;