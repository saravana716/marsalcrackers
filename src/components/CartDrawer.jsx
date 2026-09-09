// src/components/CartDrawer.jsx
import React from 'react';
import { X, ShoppingCart, Plus, Minus, Trash, Send } from 'lucide-react';
import './CartDrawer.css';



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
                <div className="cart-item-img-box" style={{ background: '#fff', overflow: 'hidden' }}>
                  <img 
                    src={item.product.image || 'https://via.placeholder.com/60'} 
                    alt={item.product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
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
