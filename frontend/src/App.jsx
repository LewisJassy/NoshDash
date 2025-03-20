import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import RestaurantList from './pages/RestaurantList/RestaurantList';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import Checkout from './pages/Checkout/Checkout';
import BottomNav from './components/BottomNav/BottomNav';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelector('.content')?.classList.add('fade-in');
    
    const timer = setTimeout(() => {
      document.querySelector('.content')?.classList.remove('fade-in');
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/tracking" element={<OrderTracking />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
        {isMobile && <BottomNav />}
      </div>
    </>
  );
};

export default App;