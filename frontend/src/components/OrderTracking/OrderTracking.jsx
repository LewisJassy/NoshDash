import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import socketService from '../../services/socketService';
import './OrderTracking.css';

const orderStages = [
  { id: 'placed', label: 'Order Placed' },
  { id: 'confirmed', label: 'Order Confirmed' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'out_for_delivery', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' }
];

const OrderTracking = ({ orderId }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [orderStatus, setOrderStatus] = useState('placed');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Connect to WebSocket and track order
    const cleanup = socketService.trackOrder(orderId, (data) => {
      setOrderDetails(data);
      const newStageIndex = orderStages.findIndex(stage => stage.id === data.status);
      setCurrentStage(newStageIndex);
      setOrderStatus(data.status);
    });

    return () => {
      cleanup(); // Cleanup WebSocket connection
    };
  }, [orderId]);

  return (
    <div className="order-tracking-container">
      <h2>Order Status</h2>
      <div className="tracking-timeline">
        {orderStages.map((stage, index) => (
          <div key={stage.id} className="stage-container">
            <motion.div
              className={`stage-point ${index <= currentStage ? 'active' : ''}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
            <motion.div
              className={`stage-label ${index <= currentStage ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {stage.label}
            </motion.div>
            {index < orderStages.length - 1 && (
              <motion.div
                className={`stage-line ${index < currentStage ? 'active' : ''}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: index < currentStage ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>

      {orderDetails && (
        <motion.div
          className="order-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Order Details</h3>
          <p>Order ID: {orderDetails.orderId}</p>
          <p>Status: {orderDetails.status}</p>
          {orderDetails.estimatedDeliveryTime && (
            <p>Estimated Delivery: {new Date(orderDetails.estimatedDeliveryTime).toLocaleTimeString()}</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default OrderTracking;