import { useState, useEffect, useRef } from 'react';
import './Home.css';
// import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStickySearch, setShowStickySearch] = useState(false);
  const homeRef = useRef(null);
  
  // Handle scroll to show sticky search
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowStickySearch(true);
      } else {
        setShowStickySearch(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animate elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(el => observer.observe(el));
    
    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };
  
  return (
    <div className="home" ref={homeRef}>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Local restaurants delivered to your doorstep</h1>
          <form className="address-search" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              className="address-input" 
              placeholder="Enter delivery address" 
              aria-label="Delivery address"
            />
            <button type="submit" className="address-button">Find Food</button>
          </form>
        </div>
      </section>
      
      {/* Sticky Search - Shows when scrolling down */}
      <div className={`sticky-search ${showStickySearch ? 'visible' : ''}`}>
        <div className="container">
          <div className="search-container">
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for restaurant or cuisine" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Category Section */}
      <section className="category-section">
        <div className="container">
          <ExploreMenu category={category} setCategory={setCategory} />
        </div>
      </section>
      
      {/* Featured Restaurants Section */}
      <section className="featured-section fade-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2>Featured Restaurants</h2>
            <a href="/restaurants" className="view-all">View all</a>
          </div>
          <FoodDisplay category={category} />
        </div>
      </section>
      
      {/* Popular Near You Section */}
      <section className="popular-section fade-on-scroll">
        <div className="container">
          <div className="section-header">
            <h2>Popular Near You</h2>
            <a href="/restaurants" className="view-all">View all</a>
          </div>
          <div className="popular-grid">
            <FoodDisplay category="Popular" />
          </div>
        </div>
      </section>
      
      {/* App Download Section */}
      <section className="app-section fade-on-scroll">
        <div className="container">
          <AppDownload />
        </div>
      </section>
    </div>
  );
};

export default Home;