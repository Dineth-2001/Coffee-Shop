import React from 'react';

const Menu = () => {
  const menuItems = [
    { name: 'Espresso', description: 'Strong and bold coffee.', price: '$3.00' },
    { name: 'Latte', description: 'Creamy coffee with steamed milk.', price: '$4.00' },
    { name: 'Cappuccino', description: 'Rich coffee topped with frothy milk.', price: '$4.50' },
    { name: 'Mocha', description: 'Chocolatey coffee with whipped cream.', price: '$5.00' },
    { name: 'Cold Brew', description: 'Smooth and refreshing cold coffee.', price: '$3.50' },
  ];

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;