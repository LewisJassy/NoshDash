import { useState, useEffect, useRef } from 'react';
import { assets } from '../../assets/assets';
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
      setShowStickySearch(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate elements on scroll
  useEffect(() => {
    const observer = new window.IntersectionObserver(
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
    // Implement search functionality
  };

  return (
    <div className="home min-h-screen bg-gray-50 pt-16 md:pt-20" ref={homeRef}>
      {/* Hero Section */}
      <section className="home-hero relative flex items-center justify-center h-[400px] md:h-[300px] bg-gradient-to-br from-green-100/80 via-white/80 to-yellow-50/80 overflow-hidden">
        <img src={assets.header_img} alt="Food delivery hero" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
        <div className="hero-content relative z-10 text-center max-w-xl px-4">
          <h1 className="text-4xl md:text-3xl font-extrabold text-white drop-shadow-lg mb-6 animate-fadeInUp">Local restaurants delivered to your doorstep</h1>
          <form className="address-search flex flex-col sm:flex-row items-center gap-3 bg-white/90 rounded-xl shadow-lg p-3 md:p-4 mx-auto max-w-lg animate-fadeInUp" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              className="address-input flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 text-gray-700 text-base placeholder-gray-400 bg-white/80" 
              placeholder="Enter delivery address" 
              aria-label="Delivery address"
            />
            <button type="submit" className="address-button px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition">Find Food</button>
          </form>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </section>

      {/* Sticky Search - Shows when scrolling down */}
      <div className={`sticky-search fixed top-16 left-0 w-full z-40 transition-all duration-300 ${showStickySearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'} bg-white/90 shadow-md py-2 md:top-20`}> 
        <div className="container mx-auto px-4">
          <div className="search-container flex items-center bg-gray-100 rounded-lg px-2 h-12 shadow-sm">
            <span className="search-icon flex items-center justify-center w-10 h-10 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search for restaurant or cuisine" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-10 bg-transparent border-none outline-none px-2 text-base text-gray-700 placeholder-gray-400"
            />
            {searchQuery && (
              <button className="clear-search absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setSearchQuery('')} type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Section */}
      <section className="category-section bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <ExploreMenu category={category} setCategory={setCategory} />
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="featured-section fade-on-scroll bg-white py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="section-header flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-xl font-bold text-gray-900">Featured Restaurants</h2>
            <a href="/restaurants" className="view-all text-green-600 font-medium hover:opacity-80 transition">View all</a>
          </div>
          <FoodDisplay category={category} />
        </div>
      </section>

      {/* Popular Near You Section */}
      <section className="popular-section fade-on-scroll bg-white border-t border-gray-100 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="section-header flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-xl font-bold text-gray-900">Popular Near You</h2>
            <a href="/restaurants" className="view-all text-green-600 font-medium hover:opacity-80 transition">View all</a>
          </div>
          <div className="popular-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <FoodDisplay category="Popular" />
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="app-section fade-on-scroll bg-green-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AppDownload />
        </div>
      </section>
    </div>
  );
};

export default Home;