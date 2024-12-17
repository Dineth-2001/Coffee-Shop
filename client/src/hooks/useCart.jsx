import { useState, useEffect } from 'react';

const useCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    return items;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
  };

  const removeItemFromCart = (_id) => {
    const updatedCart = cartItems.filter(item => item._id !== _id);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart
  };
};

export default useCart;

