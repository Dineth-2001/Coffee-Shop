import React from 'react';
import './Menu.css';
import { menu_list } from '../../assets/assets';

const Menu = () => {
  return (
    <div className="menu-list">
      {menu_list.map((item, index) => {
        return (
          <div key={index} className="menu-item">
            <img className='coffee-image' src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p className='description'>{item.description}</p>
            <p>Category: {item.category}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;