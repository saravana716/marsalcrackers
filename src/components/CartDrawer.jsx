// src/components/CartDrawer.jsx
import React from 'react';
import { X, ShoppingCart, Plus, Minus, Trash, Send } from 'lucide-react';
import './CartDrawer.css';

// Reusable micro icon matching the ProductCard SVGs for item thumbnails
const CartItemIcon = ({ type }) => {
  switch (type) {
    case 'sparkler':
      return (
        <svg viewBox="0 0 100 100">
          <line x1="30" y1="70" x2="70" y2="30" stroke="#7F8C8D" strokeWidth="4" />
          <circle cx="70" cy="30" r="7" fill="var(--color-primary)" />
        </svg>
      );
    case 'flowerpot':
      return (
        <svg viewBox="0 0 100 100">
          <path d="M38 75H62L56 50H44L38 75Z" fill="#2C3E50" stroke="var(--color-primary)" strokeWidth="2" />
        </svg>
      );
    case 'rocket':
      return (
        <svg viewBox="0 0 100 100">
          <rect x="44" y="30" width="12" height="35" fill="var(--color-secondary)" />
          <polygon points="40,30 50,12 60,30" fill="var(--color-primary)" />
        </svg>
      );
    case 'chakkar':
      return (
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-primary)" strokeWidth="4" strokeDasharray="10 5" />
        </svg>
      );
    case 'fountain':
      return (
        <svg viewBox="0 0 100 100">
          <rect x="40" y="40" width="20" height="40" rx="3" fill="#16A085" stroke="var(--color-primary)" strokeWidth="2" />
        </svg>
      );
    case 'giftbox':
      return (
        <svg viewBox="0 0 100 100">
          <rect x="25" y="35" width="50" height="45" fill="#E74C3C" rx="3" />
          <rect x="25" y="52" width="50" height="8" fill="var(--color-primary)" />
        </svg>
      );
    case 'bomb':
      return (
        <svg viewBox="0 0 100 100">
          <circle cx="45" cy="55" r="28" fill="#2C3E50" />
          <path d="M45 22 C45 15, 60 20, 65 10" stroke="#FFF" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'fancyshot':
      return (
        <svg viewBox="0 0 100 100">
          <rect x="20" y="40" width="60" height="40" rx="2" fill="#8E44AD" />
          <rect x="40" y="25" width="8" height="15" fill="#34495E" />
        </svg>
      );
    case 'combopack':
      return (
        <svg viewBox="0 0 100 100">
          <rect x="25" y="35" width="45" height="45" rx="2" fill="#D35400" />
          <rect x="40" y="45" width="40" height="40" rx="2" fill="#2980B9" />
        </svg>
      );
    case 'kidscollection':
      return (
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="var(--color-secondary)" />
          <rect x="47" y="50" width="6" height="30" rx="1" fill="#F39C12" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="var(--color-primary)" />
        </svg>
      );
  }
};

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckoutClick,
  total,
  minOrderAmount
}) {
  const handleCheckoutClick = () => {
    if (minOrderAmount && total < minOrderAmount) {
      alert(`Minimum order amount is ₹${minOrderAmount}. Your current total is ₹${total.toFixed(2)}.`);
      return;
    }
    onCheckoutClick();
  };

  return (
    <div 
      className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`}
      onClick={onClose}
    >
      <div 
        className="cart-drawer-sidebar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <h3 className="cart-drawer-title">
            <ShoppingCart size={20} /> My Shopping Cart
          </h3>
          <button className="close-drawer-btn" onClick={onClose} title="Close menu" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="cart-drawer-items-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.product.id} className="cart-drawer-item">
                {/* Visual Thumbnail */}
                <div className="cart-item-img-box">
                  <CartItemIcon type={item.product.image} />
                </div>

                {/* Details */}
                <div className="cart-item-details">
                  <span className="cart-item-name">
                    {item.product.name}
                    {item.product.quantity && item.product.type && (
                      <span style={{ marginLeft: '6px', fontSize: '0.75rem', color: '#888', fontWeight: 'normal' }}>
                        ({item.product.quantity} {item.product.type})
                      </span>
                    )}
                  </span>
                  <span className="cart-item-price">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  
                  {/* Actions Row */}
                  <div className="cart-item-actions">
                    <div className="qty-counter-box">
                      <button 
                        className="qty-count-btn"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-val-display">{item.quantity}</span>
                      <button 
                        className="qty-count-btn"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button 
                      className="delete-item-btn"
                      onClick={() => onRemoveItem(item.product.id)}
                      title="Remove product"
                      aria-label="Remove product"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-drawer-empty">
              <ShoppingCart size={48} style={{ opacity: 0.3 }} />
              <p className="cart-drawer-empty-text">Your cart is empty.</p>
              <p style={{ fontSize: '0.8rem' }}>Add some premium crackers to get started!</p>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Total Price:</span>
              <span className="cart-summary-total">₹{total.toFixed(2)}</span>
            </div>
            
            {minOrderAmount && total < minOrderAmount && (
              <div style={{ color: '#d9534f', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center', backgroundColor: '#fdf3f2', padding: '8px', borderRadius: '4px', border: '1px solid #f5c6cb' }}>
                ⚠️ Minimum order is ₹{minOrderAmount}. Add ₹{(minOrderAmount - total).toFixed(2)} more to checkout.
              </div>
            )}
            
            <button 
              className={`checkout-wa-btn ${minOrderAmount && total < minOrderAmount ? 'disabled' : ''}`}
              onClick={handleCheckoutClick}
              style={{ opacity: minOrderAmount && total < minOrderAmount ? 0.6 : 1, cursor: minOrderAmount && total < minOrderAmount ? 'not-allowed' : 'pointer' }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
