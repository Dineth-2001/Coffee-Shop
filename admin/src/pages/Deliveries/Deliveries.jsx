import React, { useEffect, useState } from 'react';
import './Deliveries.css';

const Deliveries = ({url}) => {
  const [deliveries, setDeliveries] = useState([]);

  

  useEffect(() => {
    fetch('http://localhost:4000/api/delivery/get')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setDeliveries(data))
      .catch(error => console.error('Error fetching deliveries:', error));
  }, []);

  return (
    <div className="deliveries">
      {deliveries.length === 0 ? (
        <p>No deliveries available.</p>
      ) : (
        <ul>
          {deliveries.map(delivery => (
            <li key={delivery.delivery_id}>
              <div className="delivery-info">
                <p><strong>Delivery ID:</strong> {delivery.delivery_id}</p>
                <p><strong>Address:</strong> {delivery.street}, {delivery.city}, {delivery.state}, {delivery.zip}</p>
                <p><strong>Contact:</strong> {delivery.phone_num}</p>
                <p>Status: {delivery.status}</p> 
                <button className='changeStatus'>Change</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Deliveries;
