import { memo, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = memo(({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter food items based on category and simulate loading
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network delay for loading state
    const timer = setTimeout(() => {
      const items = food_list.filter(
        item => category === 'All' || category === item.category
      );
      setFilteredItems(items);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [food_list, category]);

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-grid">
        {isLoading ? (
          // Loading skeleton cards
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="food-item-skeleton">
              <div className="skeleton-img"></div>
              <div className="skeleton-content">
                <div className="skeleton-line short"></div>
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line long"></div>
              </div>
            </div>
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <FoodItem 
              key={index} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image}
            />
          ))
        ) : (
          <div className="no-results">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" 
                stroke="var(--uber-medium-gray)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>No items found</h3>
            <p>Try another category or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
});

FoodDisplay.displayName = 'FoodDisplay';
FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;