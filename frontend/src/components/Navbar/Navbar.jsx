import { memo, useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const expandSearch = () => {
    setSearchExpanded(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };
  const collapseSearch = () => {
    if (!searchInputRef.current?.value) setSearchExpanded(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setSearchExpanded(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'backdrop-blur bg-white/80 shadow-md' : 'bg-white/90'} h-16 flex items-center`}> {/* Glassy effect */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center h-10 mr-6">
          <img src={assets.logo} alt="NoshDash" className="h-full w-auto object-contain" />
        </Link>
        {/* Search Bar */}
        <div className={`relative flex-1 max-w-md mx-4 hidden md:flex ${searchExpanded ? 'ring-2 ring-green-500' : ''} rounded-lg bg-gray-100 transition-all`}>
          <button className="flex items-center justify-center w-10 h-10 text-gray-400" onClick={expandSearch} type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <input ref={searchInputRef} type="text" placeholder="Food, groceries, drinks, etc" className="flex-1 h-10 bg-transparent border-none outline-none px-2 text-sm text-gray-700" onBlur={collapseSearch} />
          {searchExpanded && (
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" onClick={collapseSearch} type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
        </div>
        {/* Desktop Navigation Links */}
        <ul className={`hidden md:flex items-center gap-6 font-medium text-gray-700`}> {/* Modern nav */}
          <li><Link to="/" className={`hover:text-green-600 transition ${location.pathname === '/' ? 'text-green-600 font-bold' : ''}`}>Home</Link></li>
          <li><Link to="/restaurants" className={`hover:text-green-600 transition ${location.pathname === '/restaurants' ? 'text-green-600 font-bold' : ''}`}>Browse</Link></li>
          <li><Link to="/myorders" className={`hover:text-green-600 transition ${location.pathname === '/myorders' ? 'text-green-600 font-bold' : ''}`}>My Orders</Link></li>
        </ul>
        {/* User Profile and Cart */}
        <div className="flex items-center gap-2 ml-4">
          <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50 transition" aria-label="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/><path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/><path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {getTotalCartAmount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">{getTotalCartAmount()}</span>
            )}
          </Link>
          {!token ? (
            <button className="ml-2 px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition shadow" onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <button className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition" aria-label="User account">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
        </div>
        {/* Mobile Menu Toggle */}
        <button className="ml-2 md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50 transition" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-green-600 rounded transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-green-600 rounded mt-1 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-lg flex flex-col items-center py-4 md:hidden animate-fade-in z-50">
            <Link to="/" className={`py-2 w-full text-center ${location.pathname === '/' ? 'text-green-600 font-bold' : 'text-gray-700'} hover:bg-green-50`} onClick={toggleMenu}>Home</Link>
            <Link to="/restaurants" className={`py-2 w-full text-center ${location.pathname === '/restaurants' ? 'text-green-600 font-bold' : 'text-gray-700'} hover:bg-green-50`} onClick={toggleMenu}>Browse</Link>
            <Link to="/myorders" className={`py-2 w-full text-center ${location.pathname === '/myorders' ? 'text-green-600 font-bold' : 'text-gray-700'} hover:bg-green-50`} onClick={toggleMenu}>My Orders</Link>
            <Link to="/cart" className="py-2 w-full text-center text-gray-700 hover:bg-green-50" onClick={toggleMenu}>Cart</Link>
            {!token ? (
              <button className="mt-2 px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition shadow" onClick={() => { setShowLogin(true); toggleMenu(); }}>Sign in</button>
            ) : (
              <button className="mt-2 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition" aria-label="User account">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

Navbar.displayName = 'Navbar';
export default Navbar;