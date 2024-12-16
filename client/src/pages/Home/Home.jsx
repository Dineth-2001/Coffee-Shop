import React from 'react';
import './home.css';
import { assets } from '../../assets/assets';

const Home = () => {
  return (
    <div className="home-container">
      <img src={assets.background_home} alt="" className="background" />
      <header className="header">
        <h1 className="header-title">Welcome to Steamy Sips!</h1>
        <p className="header-subtitle">Discover our delicious coffee, brewed just for you.</p>
      </header>
      
      <section className="intro">
        <h2>Our Specialties</h2>
        <p>Whether you're in the mood for a smooth latte or a fresh pastry, we have something for every coffee lover.</p>
        <button className="explore-button">Explore Our Menu</button>
      </section>
    </div>
  );
};

export default Home;
