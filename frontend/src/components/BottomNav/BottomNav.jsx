import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';
// import { assets } from '../../assets/assets';

const BottomNav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  return (
    <div className="bottom-nav">
      <Link 
        to="/" 
        className={`bottom-nav-item ${activeTab === '/' ? 'active' : ''}`}
        onClick={() => setActiveTab('/')}
      >
        <div className="bottom-nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z" 
              stroke={activeTab === '/' ? "var(--uber-black)" : "var(--uber-medium-gray)"} 
              strokeWidth="2" 
              fill="none" 
            />
            <path d="M9 22V12H15V22" 
              stroke={activeTab === '/' ? "var(--uber-black)" : "var(--uber-medium-gray)"} 
              strokeWidth="2" 
              fill="none" 
            />
          </svg>
        </div>
        <span>Home</span>
      </Link>

      <Link 
        to="/restaurants" 
        className={`bottom-nav-item ${activeTab === '/restaurants' ? 'active' : ''}`}
        onClick={() => setActiveTab('/restaurants')}
      >
        <div className="bottom-nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 5.5C21 6.88071 16.9706 8 12 8C7.02944 8 3 6.88071 3 5.5M21 5.5C21 4.11929 16.9706 3 12 3C7.02944 3 3 4.11929 3 5.5M21 5.5V18.5C21 19.8807 16.9706 21 12 21C7.02944 21 3 19.8807 3 18.5V5.5M21 12C21 13.3807 16.9706 14.5 12 14.5C7.02944 14.5 3 13.3807 3 12" 
              stroke={activeTab === '/restaurants' ? "var(--uber-black)" : "var(--uber-medium-gray)"} 
              strokeWidth="2" 
              fill="none" 
            />
          </svg>
        </div>
        <span>Browse</span>
      </Link>

      <Link 
        to="/cart" 
        className={`bottom-nav-item ${activeTab === '/cart' ? 'active' : ''}`}
        onClick={() => setActiveTab('/cart')}
      >
        <div className="bottom-nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" 
              fill={activeTab === '/cart' ? "var(--uber-black)" : "var(--uber-medium-gray)"} 
            />
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" 
              fill={activeTab === '/cart' ? "var(--uber-black)" : "var(--uber-medium-gray)"} 
            />
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" 
              stroke={activeTab === '/cart' ? "var(--uber-black)" : "var(--uber-medium-gray)"} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
          </svg>
        </div>
        <span>Cart</span>
      </Link>

      <Link 
        to="/myorders" 
        className={`bottom-nav-item ${activeTab === '/myorders' ? 'active' : ''}`}
        onClick={() => setActiveTab('/myorders')}
      >
        <div className="bottom-nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke={activeTab === '/myorders' ? "var(--uber-black)" : "var(--uber-medium-gray)"} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
          </svg>
        </div>
        <span>Orders</span>
      </Link>

      <Link 
        to="#" 
        className="bottom-nav-item"
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('profile');
        }}
      >
        <div className="bottom-nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" 
              stroke={activeTab === 'profile' ? "var(--uber-black)" : "var(--uber-medium-gray)"} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
          </svg>
        </div>
        <span>Account</span>
      </Link>
    </div>
  );
};

export default BottomNav;