import React from 'react';
import ProductCard from './ProductCard';
import { Filter, X } from 'lucide-react';
import './ProductsPage.css';

export default function ProductsPage({ 
  categories = [],
  products = [],
  activeCategory, 
  onCategoryChange,
  searchQuery, 
  onAddToCart,
  cartItems,
  onUpdateQuantity,
  onWishlistToggle, 
  wishlist, 
  onQuickView,
  onResetFilters
}) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState('all');

  // Filter products based on category and price
  const filteredProducts = products.filter((product) => {
    // Category filter
    let matchesCategory = true;
    if (activeCategory === 'combos' || activeCategory === 'combo-packs') {
      matchesCategory = product.category === 'combo-packs';
    } else if (activeCategory === 'offers') {
      matchesCategory = product.originalPrice > product.price; // Discounted items
    } else if (activeCategory !== 'all') {
      matchesCategory = product.category === activeCategory;
    }

    // Price range filter
    let matchesPrice = true;
    if (priceRange === 'under-200') {
      matchesPrice = product.price < 200;
    } else if (priceRange === '200-500') {
      matchesPrice = product.price >= 200 && product.price <= 500;
    } else if (priceRange === 'above-500') {
      matchesPrice = product.price > 500;
    }

    return matchesCategory && matchesPrice;
  });

  const getSectionTitle = () => {
    if (activeCategory === 'all') return 'All Products';
    if (activeCategory === 'offers') return 'Diwali Special Offers';
    if (activeCategory === 'combo-packs') return 'Premium Combo Packs';
    
    // Find category name by ID
    const category = categories.find(c => c.id === activeCategory);
    if (category) {
      return category.name + ' Collection';
    }
    
    return 'Products Collection';
  };

  const SidebarContent = () => (
    <div className="sidebar-filters-content">
      <div className="filter-section">
        <h4 className="filter-title">Categories</h4>
        <ul className="category-filter-list">
          <li className={`category-filter-item ${activeCategory === 'all' ? 'active' : ''}`}>
            <button onClick={() => { onCategoryChange('all'); setIsMobileFilterOpen(false); }}>
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id} className={`category-filter-item ${activeCategory === cat.id ? 'active' : ''}`}>
              <button onClick={() => { onCategoryChange(cat.id); setIsMobileFilterOpen(false); }}>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Price Range</h4>
        <ul className="category-filter-list">
          <li className={`category-filter-item ${priceRange === 'all' ? 'active' : ''}`}>
            <button onClick={() => { setPriceRange('all'); setIsMobileFilterOpen(false); }}>
              All Prices
            </button>
          </li>
          <li className={`category-filter-item ${priceRange === 'under-200' ? 'active' : ''}`}>
            <button onClick={() => { setPriceRange('under-200'); setIsMobileFilterOpen(false); }}>
              Under ₹200
            </button>
          </li>
          <li className={`category-filter-item ${priceRange === '200-500' ? 'active' : ''}`}>
            <button onClick={() => { setPriceRange('200-500'); setIsMobileFilterOpen(false); }}>
              ₹200 - ₹500
            </button>
          </li>
          <li className={`category-filter-item ${priceRange === 'above-500' ? 'active' : ''}`}>
            <button onClick={() => { setPriceRange('above-500'); setIsMobileFilterOpen(false); }}>
              Above ₹500
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <section className="products-page-section">
      <div className="products-page-container">
        
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-header">
          <h2 className="mobile-page-title">{getSectionTitle()}</h2>
          <button 
            className="mobile-filter-toggle-btn"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Mobile Filter Drawer Overlay */}
        <div className={`mobile-filter-drawer-overlay ${isMobileFilterOpen ? 'open' : ''}`} onClick={() => setIsMobileFilterOpen(false)}></div>
        
        {/* Mobile Filter Drawer */}
        <div className={`mobile-filter-drawer ${isMobileFilterOpen ? 'open' : ''}`}>
          <div className="mobile-filter-drawer-header">
            <h3>Filter Products</h3>
            <button onClick={() => setIsMobileFilterOpen(false)} className="close-filter-btn">
              <X size={24} />
            </button>
          </div>
          <div className="mobile-filter-scroll-area">
            <SidebarContent />
          </div>
        </div>

        <div className="products-layout-grid">
          {/* Desktop Left Sidebar */}
          <aside className="products-sidebar desktop-only" data-aos="fade-right">
            <h3 className="sidebar-main-title">Filters</h3>
            <SidebarContent />
          </aside>

          {/* Right Product Grid Area */}
          <div className="products-main-content">
            <div className="products-header-row desktop-only" data-aos="fade-down">
              <div className="products-title-wrap">
                <h3 className="products-title">{getSectionTitle()}</h3>
                <p className="products-subtitle">
                  Showing {filteredProducts.length} cracker{filteredProducts.length !== 1 ? 's' : ''} with wholesale prices
                </p>
              </div>
              
              {activeCategory !== 'all' && (
                <button 
                  className="view-all-red-btn"
                  onClick={() => onResetFilters ? onResetFilters() : null}
                  aria-label="View all cracker items"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    cartItems={cartItems}
                    onUpdateQuantity={onUpdateQuantity}
                    onWishlistToggle={onWishlistToggle}
                    isWished={wishlist.includes(product.id)}
                    onQuickView={onQuickView}
                    aosDelay={(index % 4) * 100}
                  />
                ))
              ) : (
                <div className="empty-products-state">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="var(--color-primary)" opacity="0.6"/>
                  </svg>
                  <h4 className="empty-state-title">No Crackers Found</h4>
                  <p className="empty-state-text">
                    We couldn't find any products matching your selection. Try clearing your search query or choosing another category!
                  </p>
                  <button className="reset-filter-btn" onClick={onResetFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
