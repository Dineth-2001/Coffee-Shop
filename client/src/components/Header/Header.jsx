import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Coffee Shop Logo" className="logo" />
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;