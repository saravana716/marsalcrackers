// src/components/QuickViewModal.jsx
import React from 'react';
import { X, Star, ShieldCheck, Clock, Award, Leaf, ShoppingCart } from 'lucide-react';
import './QuickViewModal.css';

// Component to render large product image
const LargeProductIcon = ({ type, alt }) => {
  return (
    <img 
      src={type || 'https://via.placeholder.com/300'} 
      alt={alt || "Product"} 
      style={{ objectFit: 'contain', width: '100%', height: '100%', maxHeight: '400px', color: '#333', textAlign: 'center' }} 
    />
  );
};

export default function QuickViewModal({ isOpen, product, onClose, onAddToCart }) {
  if (!product) return null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
      onClose(); // Auto close on successful add
    }
  };

  return (
    <div className={`qv-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="qv-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="qv-close-btn" onClick={onClose} title="Close window" aria-label="Close window">
          <X size={20} />
        </button>

        {/* Left Column Graphic */}
        <div className="qv-graphics-section">
          <LargeProductIcon type={product.image} alt={product.name} />
        </div>

        {/* Right Column Details */}
        <div className="qv-details-section">
          <div>
            <span className="qv-category">{product.categoryName}</span>
            {product.quantity && product.type && (
              <span className="qv-unit-tag" style={{ marginLeft: '10px', fontSize: '0.85rem', color: '#666', background: '#F0F0F0', padding: '3px 8px', borderRadius: '4px', fontWeight: '500' }}>
                {product.quantity} {product.type}
              </span>
            )}
            <h3 className="qv-title">{product.name}</h3>

            {/* Ratings row */}
            <div className="qv-rating-row">
              <span className="qv-rating">
                <Star size={16} fill="currentColor" style={{ marginRight: '4px' }} />
                {product.rating}
              </span>
              <span className="qv-reviews">({product.reviews} customer reviews)</span>
            </div>

            {/* Price Detail */}
            <div className="qv-price-row">
              <span className="qv-current-price">₹{product.price.toFixed(2)}</span>
              <span className="qv-original-price">₹{product.originalPrice.toFixed(2)}</span>
              <span className="qv-discount-label">{discount}% OFF</span>
            </div>

            {/* Description */}
            <p className="qv-desc">{product.desc}</p>
          </div>

          {/* Features Box (Replacing Safety Instructions) */}
          <div className="qv-features-box">
            <div className="qv-feature-item">
              <ShieldCheck className="qv-feature-icon" />
              <div className="qv-feature-text">
                <strong>SAFE TO USE</strong>
                <span>Low smoke</span>
              </div>
            </div>
            <div className="qv-feature-divider"></div>
            <div className="qv-feature-item">
              <Clock className="qv-feature-icon" />
              <div className="qv-feature-text">
                <strong>LONG LASTING</strong>
                <span>Bright & steady</span>
              </div>
            </div>
            <div className="qv-feature-divider"></div>
            <div className="qv-feature-item">
              <Award className="qv-feature-icon" />
              <div className="qv-feature-text">
                <strong>PREMIUM QUALITY</strong>
                <span>Best materials</span>
              </div>
            </div>
            <div className="qv-feature-divider"></div>
            <div className="qv-feature-item">
              <Leaf className="qv-feature-icon" style={{ color: '#F39C12' }} />
              <div className="qv-feature-text">
                <strong>ECO FRIENDLY</strong>
                <span>Less residue</span>
              </div>
            </div>
          </div>

          {/* Add to Cart Trigger */}
          <div className="qv-action-row">
            {product.stock <= 0 ? (
              <button className="qv-add-cart-btn" disabled style={{ background: '#ccc', color: '#666', cursor: 'not-allowed', boxShadow: 'none' }}>
                <span>Out of Stock</span>
              </button>
            ) : (
              <button className="qv-add-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart size={18} /> Add to Shopping Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
