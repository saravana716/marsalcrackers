// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, ChevronDown, Sparkles, X, Menu, Home, Grid, Download } from 'lucide-react';
import logoImg from '../assets/lo.png';
import './Header.css';

export default function Header({
  cartCount,
  cartTotal,
  onCartClick,
  onSearch,
  activeCategory,
  onCategoryChange,
  currentPage,
  setCurrentPage,
  onResetFilters,
  marqueeText,
  minOrderAmount
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerEl = document.querySelector('.header-container');
      if (headerEl) {
        document.documentElement.style.setProperty('--header-height', `${headerEl.offsetHeight}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // Multiple timeouts to ensure dynamic elements/fonts/images are loaded
    const t1 = setTimeout(updateHeaderHeight, 100);
    const t2 = setTimeout(updateHeaderHeight, 500);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentPage]); // Re-run when page changes in case top promo bar hides or shows

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const handleNavClick = (page, sectionId) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="header-container">
      {/* Top Split Promo Bar - 3 Columns with Social Icons */}
      <div className="top-promo-bar">
        <div className="promo-left">
          <span>🚚 Delivery in 2-3 Days Pan India</span>
        </div>
        <div className="promo-center marquee-container">
          <div className="marquee-content">
            <span>{marqueeText || ''}</span>
            <span>{marqueeText || ''}</span>
          </div>
        </div>
        <div className="promo-right">
          <span className="promo-phone">📞 +91 89400 98344, +91 89400 98342</span>
        </div>
      </div>

      {/* Main Header Bar - Unified Row containing Logo, Navigation Menu, and Actions */}
      <div className="main-header">
        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-menu-toggle-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>

        {/* Left: Serif Logo Group */}
        <a href="/" className="header-logo-section" onClick={(e) => { e.preventDefault(); handleNavClick('home'); if (onResetFilters) onResetFilters(); }}>
          <img src={logoImg} alt="Marsal Traders Logo" className="header-logo-image" />
        </a>

        {/* Center: Navigation Menu Links */}
        <nav className="header-nav-menu">
          <a
            href="#home"
            className={`nav-link-item ${currentPage === 'home' && activeCategory === 'all' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); if (onResetFilters) onResetFilters(); }}
          >
            Home
          </a>
          <a
            href="#about"
            className={`nav-link-item ${currentPage === 'about' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
          >
            About Us
          </a>
          <a
            href="#products"
            className={`nav-link-item ${currentPage === 'products' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
          >
            Products
          </a>
          <a
            href="#quickpurchase"
            className={`nav-link-item ${currentPage === 'quick-purchase' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('quick-purchase'); }}
          >
            Quick Purchase
          </a>
          <a
            href="#contact"
            className={`nav-link-item ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
          >
            Contact Us
          </a>

        </nav>

        {/* Right: Collapsed Icon Toggles & Solid Gold WhatsApp CTA */}
        <div className="header-action-group">
          {/* Cart Icon Button */}
          <button
            className="header-icon-action-btn header-cart-icon-btn"
            onClick={onCartClick}
            aria-label="Open cart trigger"
            title="Open cart drawer"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
          </button>

          {/* Flickering Price List Download Button */}
          <a
            href="/pricelist.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="header-download-btn"
            title="Download Price List"
          >
            <Download size={16} />
            <span className="hide-mobile">Price List</span>
          </a>

          {/* Solid Gold WhatsApp Order CTA button */}
          <a
            href="https://wa.me/918940098344?text=Hello%20Marsal%20Traders,%20I%20want%20to%20order%20some%20crackers."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-solid-btn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.767.46 3.427 1.267 4.904L2 22l5.244-1.22c1.427.777 3.05 1.232 4.768 1.232C17.52 22.012 22 17.532 22 12.012 22 6.48 17.52 2 12.012 2zm0 18.012c-1.57 0-3.037-.417-4.32-1.144l-.31-.184-3.21.748.766-3.125-.2-.32C3.93 14.73 3.51 13.4 3.51 12.01 3.51 7.33 7.33 3.51 12.01 3.51c4.68 0 8.5 3.82 8.5 8.5 0 4.68-3.82 8.502-8.5 8.502zM16.5 13.5c-.244-.12-1.442-.71-1.666-.79-.224-.084-.388-.12-.55.124-.165.244-.64.79-.785.952-.145.163-.29.183-.537.062-.244-.12-1.034-.38-1.97-1.215-.728-.65-1.22-1.45-1.362-1.696-.145-.244-.015-.376.107-.497.11-.11.244-.286.366-.43.122-.14.163-.242.244-.405.082-.163.04-.306-.02-.43-.06-.12-.55-1.32-.754-1.815-.2-.48-.4-.41-.55-.418h-.47c-.162 0-.427.06-.65.306-.225.245-.858.837-.858 2.04 0 1.2 1.058 2.37 1.2 2.57.143.204 2.083 3.18 5.047 4.46.705.305 1.256.487 1.684.623.708.225 1.353.193 1.863.117.57-.085 1.442-.59 1.644-1.162.2-.57.2-1.06.142-1.162-.058-.1-.223-.16-.467-.28z" />
            </svg>
            <span>WhatsApp Order</span>
          </a>
        </div>
      </div>

      {/* Mobile Sliding Drawer Menu */}
      <div className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className="mobile-drawer-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <a href="/" className="header-logo-section" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); if (onResetFilters) onResetFilters(); }}>
              <img src={logoImg} alt="Marsal Traders Logo" className="header-logo-image mobile-drawer-logo" />
            </a>
            <button className="close-drawer-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>



          <nav className="mobile-drawer-nav">
            <a
              href="#home"
              className={`mobile-nav-link ${currentPage === 'home' && activeCategory === 'all' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); if (onResetFilters) onResetFilters(); }}
            >
              Home
            </a>
            <a
              href="#about"
              className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            >
              About Us
            </a>
            <a
              href="#products"
              className={`mobile-nav-link ${currentPage === 'products' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}
            >
              Products
            </a>
            <a
              href="#quickpurchase"
              className={`mobile-nav-link ${currentPage === 'quick-purchase' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('quick-purchase'); }}
            >
              Quick Purchase
            </a>
            <a
              href="#contact"
              className={`mobile-nav-link ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            >
              Contact Us
            </a>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', paddingLeft: '10px' }}>
              <a
                href="/pricelist.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="header-download-btn"
                title="Download Price List"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Download size={16} />
                <span>Price List</span>
              </a>
            </div>
          </nav>

          <div className="mobile-drawer-footer">
            <span className="mobile-drawer-phone">📞+91 89400 98344</span>
            <a
              href="https://wa.me/918940098344?text=Hello%20Sai%20Sparkz%20Hub,%20I%20want%20to%20order%20some%20crackers."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-solid-btn"
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.767.46 3.427 1.267 4.904L2 22l5.244-1.22c1.427.777 3.05 1.232 4.768 1.232C17.52 22.012 22 17.532 22 12.012 22 6.48 17.52 2 12.012 2zm0 18.012c-1.57 0-3.037-.417-4.32-1.144l-.31-.184-3.21.748.766-3.125-.2-.32C3.93 14.73 3.51 13.4 3.51 12.01 3.51 7.33 7.33 3.51 12.01 3.51c4.68 0 8.5 3.82 8.5 8.5 0 4.68-3.82 8.502-8.5 8.502zM16.5 13.5c-.244-.12-1.442-.71-1.666-.79-.224-.084-.388-.12-.55.124-.165.244-.64.79-.785.952-.145.163-.29.183-.537.062-.244-.12-1.034-.38-1.97-1.215-.728-.65-1.22-1.45-1.362-1.696-.145-.244-.015-.376.107-.497.11-.11.244-.286.366-.43.122-.14.163-.242.244-.405.082-.163.04-.306-.02-.43-.06-.12-.55-1.32-.754-1.815-.2-.48-.4-.41-.55-.418h-.47c-.162 0-.427.06-.65.306-.225.245-.858.837-.858 2.04 0 1.2 1.058 2.37 1.2 2.57.143.204 2.083 3.18 5.047 4.46.705.305 1.256.487 1.684.623.708.225 1.353.193 1.863.117.57-.085 1.442-.59 1.644-1.162.2-.57.2-1.06.142-1.162-.058-.1-.223-.16-.467-.28z" />
              </svg>
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sticky Navigation Bar removed as per user request */}
    </header>
  );
}
