import React from 'react';

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Coffee Shop. All rights reserved.</p>
      <div>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </footer>
  );
}

export default Footer;