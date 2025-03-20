import React, { useState, useEffect } from 'react';
import './OrderTracking.css';

const OrderTracking = () => {
  const [orderStatus, setOrderStatus] = useState('Preparing');

  useEffect(() => {
    // Simulate real-time updates with a timeout (replace with WebSocket or API integration)
    const statuses = ['Preparing', 'Out for Delivery', 'Delivered'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setOrderStatus(statuses[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="order-tracking">
      <h1>Order Tracking</h1>
      <p>Current Status: <strong>{orderStatus}</strong></p>
      <div className="status-bar">
        <div className={`status-step ${orderStatus === 'Preparing' ? 'active' : ''}`}>Preparing</div>
        <div className={`status-step ${orderStatus === 'Out for Delivery' ? 'active' : ''}`}>Out for Delivery</div>
        <div className={`status-step ${orderStatus === 'Delivered' ? 'active' : ''}`}>Delivered</div>
      </div>
    </div>
  );
};

export default OrderTracking;