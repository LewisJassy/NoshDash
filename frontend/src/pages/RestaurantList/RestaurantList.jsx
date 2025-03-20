import React from 'react';
import './RestaurantList.css';

const RestaurantList = () => {
  return (
    <div className="restaurant-list">
      <h1>Restaurants</h1>
      <div className="restaurant-cards">
        {/* Example restaurant card */}
        <div className="restaurant-card">
          <img src="/path/to/restaurant-image.jpg" alt="Restaurant" />
          <h2>Restaurant Name</h2>
          <p>Cuisine Type</p>
          <button>View Menu</button>
        </div>
        {/* Add more restaurant cards dynamically */}
      </div>
    </div>
  );
};

export default RestaurantList;