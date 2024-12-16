import React from 'react';
import './About.css';
import { assets } from '../../assets/assets';

const About = () => {
  return (
    <div className="about-container">
      <img src={assets.background_about} alt="" className="background-about" />
      <h1 className="about-header">Welcome to Our Coffee Haven</h1>
      <p className="about-text">At Steamy Sips, every cup tells a story. A story brewed with passion, warmth, and dedication. Join us on a journey where each sip brings you closer to the heart of the coffee world.</p>

      <section className="about-history">
        <h2 className="about-subheader">Our Story</h2>
        <p className="about-text">Founded in 1985, our humble beginnings began with a dream of serving the finest coffee to the community. From a small corner kiosk to your favorite neighborhood café, our passion for coffee has remained as strong as ever.</p>
      </section>

      <section className="about-values">
        <h2 className="about-subheader">Our Values</h2>
        <p className="about-text">We are dedicated to sustainability, supporting ethical coffee farming, and creating a space that feels like home. Every cup we serve is a reflection of our commitment to quality, community, and a love for coffee that connects us all.</p>
      </section>

      <section className="about-vision">
        <h2 className="about-subheader">Our Vision</h2>
        <p className="about-text">To be more than just a coffee shop – a space where friends meet, ideas are brewed, and memories are made. We aim to inspire every customer who walks through our doors with the warmth of our service and the richness of our coffee.</p>
      </section>
    </div>
  );
};

export default About;


// import React from 'react';

// const About = () => {
//   return (
//     <div>
//       <h1>About Our Coffee Shop</h1>
//       <p>Welcome to our coffee shop! We have been serving the community since [Year]. Our mission is to provide high-quality coffee and a cozy atmosphere for our customers.</p>
//       <h2>Our History</h2>
//       <p>Founded by [Founder's Name], our coffee shop started as a small kiosk and has grown into a beloved local spot. We take pride in sourcing our beans from sustainable farms.</p>
//       <h2>Our Values</h2>
//       <p>We believe in quality, sustainability, and community. Every cup of coffee we serve is made with care and passion.</p>
//     </div>
//   );
// };

// export default About;