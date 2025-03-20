import { memo, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './FoodItem.css';
// import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = memo(({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={`food-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="food-item-img-container">
        <div className={`image-skeleton ${imageLoaded ? 'loaded' : ''}`}></div>
        <img 
          className={`food-item-image ${imageLoaded ? 'loaded' : ''}`} 
          src={url + '/images/' + image} 
          alt={name}
          onLoad={() => setImageLoaded(true)} 
        />
        
        {/* Add to cart buttons */}
        {!cartItems[id] ? (
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Add</span>
          </button>
        ) : (
          <div className="food-item-counter">
            <button onClick={() => removeFromCart(id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span>{cartItems[id]}</span>
            <button onClick={() => addToCart(id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
        
        {/* Estimated delivery time overlay */}
        <div className="delivery-time">20–35 min</div>
      </div>
      
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3>{name}</h3>
          <div className="rating">
            <span>4.8</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                fill="var(--uber-rating)" stroke="var(--uber-rating)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <p className="food-item-desc">{description}</p>
        
        <div className="food-item-meta">
          <p className="food-item-price">${price.toFixed(2)}</p>
          <div className="delivery-fee">$0.49 delivery fee</div>
        </div>
      </div>
    </div>
  );
});

FoodItem.displayName = 'FoodItem';
FoodItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FoodItem;