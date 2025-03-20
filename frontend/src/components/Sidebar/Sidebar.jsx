import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/tracking">Order Tracking</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/myorders">My Orders</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;