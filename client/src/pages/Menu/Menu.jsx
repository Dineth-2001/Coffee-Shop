import React, {useState} from 'react';
import './Menu.css';
import { menu_list } from '../../assets/assets';
import { assets } from '../../assets/assets';
import useCart from '../../hooks/useCart';
import Modal from '../../components/Modal/Modal';

const Menu = () => {
  const { addItemToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleAddToCart = (item) => {
    addItemToCart(item);
    setModalContent(
      <>
        <p><span className="modal-highlight">{item.name}</span> has been added to your cart 🎉</p>
        <p>Enjoy exploring more delicious brews!</p>
      </>
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="menu-page">
      <img src={assets.background_menu} alt="" className="background-menu" />
      <div className="menu-list">
        {menu_list.map((item, index) => {
          return (
            <div key={index} className="menu-item">
              <img className='coffee-image' src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p className='description'>{item.description}</p>
              <p>Category: {item.category}</p>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          );
        })}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default Menu;