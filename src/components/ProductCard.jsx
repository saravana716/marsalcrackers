// src/components/ProductCard.jsx
import React from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import './ProductCard.css';

// Component to render product image
export const ProductIcon = ({ type, alt }) => {
  return (
    <img 
      src={type || 'https://via.placeholder.com/150'} 
      alt={alt || "Product"} 
      className="product-svg-drawing" 
      style={{ objectFit: 'contain', width: '100%', height: '100%', color: '#333', textAlign: 'center' }}
    />
  );
};

export default function ProductCard({ product, onAddToCart, cartItems = [], onUpdateQuantity, onWishlistToggle, isWished, onQuickView }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(product.id);
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="product-card" onClick={handleQuickView}>
      {/* Product Tag/Badge */}
      {product.tag && (
        <span className={`product-badge ${product.tag === 'Premium Pack' || product.tag === 'Mega Deal' ? 'gold' : ''}`}>
          {product.tag}
        </span>
      )}

      {/* Wishlist Button */}
      <button 
        className={`product-wishlist-btn ${isWished ? 'wished' : ''}`} 
        onClick={handleWishlistClick}
        title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
      </button>

      <div className="product-image-container">
        <ProductIcon type={product.image} alt={product.name} />
        {/* Particle Overlay effect on hover */}
        <div className="product-card-sparkles">
          <div style={{ position: 'absolute', top: '10%', left: '15%', color: 'var(--color-primary)', fontSize: '10px' }}>✦</div>
          <div style={{ position: 'absolute', top: '70%', left: '80%', color: 'var(--color-secondary)', fontSize: '8px' }}>✦</div>
          <div style={{ position: 'absolute', top: '20%', left: '75%', color: '#FFF', fontSize: '12px' }}>✦</div>
          <div style={{ position: 'absolute', top: '80%', left: '20%', color: 'var(--color-primary)', fontSize: '9px' }}>✦</div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="product-info">
        <div className="product-meta-row">
          <span className="product-category-tag">{product.categoryName}</span>
          {product.quantity && product.type && (
            <span className="product-unit-tag" style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#666', background: '#F0F0F0', padding: '2px 6px', borderRadius: '4px' }}>
              {product.quantity} {product.type}
            </span>
          )}
        </div>
        <h4 className="product-card-name">{product.name}</h4>

        {/* Price Row */}
        <div className="product-price-section">
          <span className="current-price-val">₹{product.price.toFixed(2)}</span>
          <span className="original-price-val">₹{product.originalPrice.toFixed(2)}</span>
          <span className="discount-pct-badge">{discount}% OFF</span>
        </div>

        {/* Action Row */}
        <div className="product-card-actions">
          {product.stock <= 0 ? (
            <button className="add-cart-btn out-of-stock-btn" disabled>
              <span>Out of Stock</span>
            </button>
          ) : cartQuantity > 0 ? (
            <div className="qty-control-wrapper">
              <button className="qty-ctrl-btn" onClick={(e) => { e.stopPropagation(); onUpdateQuantity?.(product.id, cartQuantity - 1); }}>-</button>
              <span className="qty-ctrl-val">{cartQuantity}</span>
              <button 
                className="qty-ctrl-btn" 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity?.(product.id, cartQuantity + 1); }}
                disabled={cartQuantity >= product.stock}
                title={cartQuantity >= product.stock ? "Max stock reached" : ""}
              >
                +
              </button>
            </div>
          ) : (
            <button className="add-cart-btn" onClick={handleAddToCart}>
              <ShoppingCart size={16} /> <span>Add To Cart</span>
            </button>
          )}
          <button className="quick-view-circle-btn" onClick={handleQuickView} title="Quick View" aria-label="Quick View">
            <Eye size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
