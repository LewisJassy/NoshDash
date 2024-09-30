import { useContext, useState, useEffect } from 'react'; // Added useEffect
import PropTypes from 'prop-types';
import './Navbar.css';
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  // UseEffect to hide dropdown after hovering away for a second
  useEffect(() => {
    let hideDropdownTimeout;
    if (isDropdownOpen) {
      document.addEventListener('mouseover', handleMouseOverDropdown);
    }

    function handleMouseOverDropdown(event) {
      if (!event.target.closest('.navbar-profile')) {
        hideDropdownTimeout = setTimeout(() => {
          setDropdownOpen(false);
        }, 1000); // 1-second delay before hiding the dropdown
      } else {
        clearTimeout(hideDropdownTimeout); // Clear timeout if the user hovers back
      }
    }

    return () => {
      document.removeEventListener('mouseover', handleMouseOverDropdown);
      clearTimeout(hideDropdownTimeout);
    };
  }, [isDropdownOpen]);

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt="" className='logo' />
      </Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
        <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" onClick={() => setDropdownOpen(!isDropdownOpen)} /> {/* Toggle dropdown on click */}
            {isDropdownOpen && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => { navigate('/myorders'); setDropdownOpen(false); }}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={() => { logout(); setDropdownOpen(false); }}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;