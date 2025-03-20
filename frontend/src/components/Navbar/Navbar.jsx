import { memo, useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { assets } from './../../assets/assets';
import { StoreContext } from './../context/StoreContext';

const Navbar = memo(({ setShowLogin }) => {
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const expandSearch = () => {
    setSearchExpanded(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const collapseSearch = () => {
    if (!searchInputRef.current?.value) {
      setSearchExpanded(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Collapse search and menu when changing routes
  useEffect(() => {
    setSearchExpanded(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="Home">
          <img src={assets.logo} alt="NoshDash" />
        </Link>

        {/* Search Bar - Mobile collapsed by default, expands on click */}
        <div className={`navbar-search ${searchExpanded ? 'expanded' : ''}`}>
          <div className="search-icon" onClick={expandSearch}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Food, groceries, drinks, etc" 
            onBlur={collapseSearch}
          />
          {searchExpanded && (
            <button className="search-close" onClick={collapseSearch}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/restaurants" className={location.pathname === '/restaurants' ? 'active' : ''}>Browse</Link>
          </li>
          <li className="navbar-item">
            <Link to="/myorders" className={location.pathname === '/myorders' ? 'active' : ''}>My Orders</Link>
          </li>
        </ul>

        {/* User Profile and Cart */}
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart" aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {getTotalCartAmount() > 0 && (
              <span className="cart-badge">{getTotalCartAmount()}</span>
            )}
          </Link>
          
          {!token ? (
            <button className="navbar-signin" onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <button className="navbar-user" aria-label="User account">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`toggle-icon ${menuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
});

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

Navbar.displayName = 'Navbar';
export default Navbar;