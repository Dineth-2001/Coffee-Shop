import React, { useEffect, useState } from 'react'
import useCart from '../../hooks/useCart'
import './PlaceOrder.css'
import { assets } from '../../assets/assets'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {cartItems} = useCart();
  const navigate = useNavigate();

  const consolidatedCart = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const grandTotal = consolidatedCart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const deliveryFee = 2;
  const totalWithDelivery = grandTotal + deliveryFee;

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.id;

  const cart_id = sessionStorage.getItem('cart_id');
  if (!cart_id) {
    console.error('No cart_id found');
    return;
  }

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone_num: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const validateFields = () => {
    const { first_name, street, city, state, zip, phone_num } = data;
    // if (!first_name || !street || !city || !state || !zip || !phone_num) {
    //   toast.error('Please fill in all required fields.');
    //   return false;
    // }
    if (!/^\d{5}$/.test(zip)) {
      toast.error('Please enter a valid zip code.');
      return false;
    }
    if (!/^\d{10}$/.test(phone_num)) {
      toast.error('Please enter a valid phone number.');
      return false;
    }
    return true;
  };

  const handlePaymentClick = async (event) => {
    event.preventDefault();
    let deliveryItems = [];
    cartItems.map((item) => {
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        deliveryItems.push(itemInfo);
      }
      console.log(deliveryItems);
    })

    if (!validateFields()) {
      return;
    }

    const deliveryData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      phone_num: data.phone_num,
      tot_with_delivery: totalWithDelivery,
      cart_id,
      user_id,
    };

    // try {
    //   const response = await axios.post('http://localhost:4000/api/delivery/add', deliveryData);
    //   if (response.data.success) {
    //     toast.success('Delivery placed!');
    //     navigate('/payment');
    //   } else {
    //     toast.error('Failed to add delivery');
    //   }
    // } catch (error) {
    //   console.error('Error during delivery:', error);
    // }
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <form className="place-order">
      <ToastContainer />
        <img src={assets.background_cart} alt="" className="background-place-order" />
        <div className="place-order-left">
            <p className='title'>Your Delivery Details</p>
            <div className="multi-field">
                <input type="text" placeholder="* First Name" name='first_name' onChange={onChangeHandler} value={data.first_name} required/>
                <input type="text" placeholder="Last Name" name='last_name' onChange={onChangeHandler}value={data.last_name} />
            </div>
            <input type="email" placeholder="Email Address" name='email' onChange={onChangeHandler} value={data.email} />
            <input type="text" placeholder="* Street" name='street' onChange={onChangeHandler} value={data.street} required/>
            <div className="multi-field">
                <input type="text" placeholder="* City" name='city' onChange={onChangeHandler} value={data.city} required/>
                <input type="text" placeholder="* State" name='state' onChange={onChangeHandler} value={data.state} required/>
            </div>
            <div className="multi-field">
                <input type="text" placeholder="* Zip Code" name='zip' onChange={onChangeHandler} value={data.zip} required/>
            </div>
            <input type="text" placeholder="* Phone Number" name='phone_num' onChange={onChangeHandler} value={data.phone_num} required/> 
        </div>

        <div className="place-order-right">
            <div className="place-order-table">
            <div className="place-order-table-header">
              <span>Item</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>
            {consolidatedCart.map((item) => (
              <div className="place-order-table-row" key={item._id}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>            
            ))}
          </div>
          <div className="place-order-total">
            <h4>Delivery Fee: $2</h4>
            <h3>Grand Total: ${totalWithDelivery.toFixed(2)}</h3>
          </div>
        </div>
        <div className="payment-button">
            <button onClick={handlePaymentClick}>Proceed to Payment</button>
        </div>
    </form>
  )
}

export default PlaceOrder
