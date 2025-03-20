import React, { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = () => {
    alert(`Payment successful with ${paymentMethod}`);
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <input type="text" id="address" placeholder="Enter your address" required />
        </div>
        <div className="form-group">
          <label htmlFor="payment">Payment Method</label>
          <select id="payment" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="">Select a payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        <button type="button" onClick={handlePayment} className="checkout-button">Pay Now</button>
      </form>
    </div>
  );
};

export default Checkout;