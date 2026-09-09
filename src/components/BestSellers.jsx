import React from 'react';
import ProductCard from './ProductCard';
import './BestSellers.css';

export default function BestSellers({ 
  products = [],
  activeCategory, 
  searchQuery, 
  onAddToCart,
  cartItems,
  onUpdateQuantity,
  onWishlistToggle, 
  wishlist, 
  onQuickView,
  onResetFilters
}) {
  // Filter products based on category
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

    return matchesCategory;
  });

  const getSectionTitle = () => {
    if (activeCategory === 'all') return 'Top Picks for You';
    if (activeCategory === 'offers') return 'Diwali Special Offers';
    if (activeCategory === 'combo-packs') return 'Premium Combo Packs';
    
    // Format category id to readable title
    return activeCategory
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') + ' Collection';
  };

  return (
    <section className="bestsellers-section" id="bestsellers">
      <div className="bestsellers-header-row" data-aos="fade-down">
        <div className="bestsellers-title-wrap">
          <h3 className="bestsellers-title">{getSectionTitle()}</h3>
          <p className="bestsellers-subtitle">
            Discover {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} at factory rates
          </p>
        </div>
        
        {activeCategory !== 'all' && (
          <button 
            className="view-all-red-btn"
            onClick={() => onResetFilters ? onResetFilters() : null}
            aria-label="View all cracker items"
          >
            View All
          </button>
        )}
      </div>

      <div className="products-grid-layout">
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
    </section>
  );
}
