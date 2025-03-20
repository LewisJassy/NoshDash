import { useRef, useEffect } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import PropTypes from 'prop-types';

const ExploreMenu = ({ category, setCategory }) => {
  const scrollContainerRef = useRef(null);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          scrollContainerRef.current.scrollLeft += e.deltaY;
        }
      }
    };

    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="category-scroller" ref={scrollContainerRef}>
        <div className="category-item-wrapper">
          <div 
            onClick={() => setCategory('All')} 
            className={`category-item ${category === 'All' ? 'active' : ''}`}
          >
            <div className="category-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
                  fill={category === 'All' ? 'var(--uber-black)' : 'var(--uber-medium-gray)'} />
                <path d="M12 22C15.866 22 19 20.2091 19 18C19 15.7909 15.866 14 12 14C8.13401 14 5 15.7909 5 18C5 20.2091 8.13401 22 12 22Z" 
                  fill={category === 'All' ? 'var(--uber-black)' : 'var(--uber-medium-gray)'} />
              </svg>
            </div>
            <p>All</p>
          </div>
        </div>
        
        {menu_list.map((item, index) => (
          <div className="category-item-wrapper" key={index}>
            <div 
              onClick={() => setCategory(item.menu_name)} 
              className={`category-item ${category === item.menu_name ? 'active' : ''}`}
            >
              <div className="category-icon">
                <img src={item.menu_image} alt={item.menu_name} />
              </div>
              <p>{item.menu_name}</p>
            </div>
          </div>
        ))}
        
        <div className="category-fade-right"></div>
      </div>
    </div>
  );
};

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;