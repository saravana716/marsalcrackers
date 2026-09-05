import React from 'react';
import { ProductIcon } from './ProductCard';
import './QuickPurchasePage.css';

export default function QuickPurchasePage({ products = [], categories = [], cartItems, minOrderAmount, onUpdateQuantity, onNavigate, clearCart }) {
  // Group products by category
  const productsByCategory = categories.map(cat => ({
    ...cat,
    items: products.filter(p => p.category === cat.id)
  })).filter(cat => cat.items.length > 0);

  // Calculate totals
  const originalTotal = cartItems.reduce((acc, item) => acc + (item.product.originalPrice * item.quantity), 0);
  const subTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalSaved = originalTotal - subTotal;
  
  const overallTotal = subTotal;

  const getQuantity = (productId) => {
    const item = cartItems.find(i => i.product.id === productId);
    return item ? item.quantity : '';
  };

  const handleInputChange = (e, productId) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      onUpdateQuantity(productId, 0); // Clear it
    } else {
      onUpdateQuantity(productId, val);
    }
  };

  return (
    <section className="quick-purchase-section">
      {/* Sticky Summary Bar */}
      <div className="quick-purchase-summary-sticky">
        {/* Desktop Summary View */}
        <div className="qp-summary-container desktop-summary">
          <div className="qp-summary-totals-row">

            <div className="qp-summary-item highlight-overall">
              <span className="qp-summary-label">Overall Total:</span>
              <span className="qp-summary-val">₹{overallTotal.toFixed(2)}</span>
            </div>
          </div>
          {minOrderAmount && overallTotal > 0 && overallTotal < minOrderAmount && (
            <div className="qp-min-order-alert-desktop">
              ⚠️ Minimum order is ₹{minOrderAmount}. Add ₹{(minOrderAmount - overallTotal).toFixed(2)} more.
            </div>
          )}
          <button 
            className={`qp-sticky-checkout-btn ${overallTotal <= 0 || (minOrderAmount && overallTotal < minOrderAmount) ? 'disabled' : ''}`}
            onClick={() => onNavigate('checkout')}
            disabled={overallTotal <= 0 || (minOrderAmount && overallTotal < minOrderAmount)}
            style={{ opacity: overallTotal <= 0 || (minOrderAmount && overallTotal < minOrderAmount) ? 0.6 : 1, cursor: overallTotal <= 0 || (minOrderAmount && overallTotal < minOrderAmount) ? 'not-allowed' : 'pointer' }}
          >
            Checkout Now
          </button>
        </div>

        {/* Mobile Bottom Navigation Summary */}
        <div className="qp-mobile-bottom-wrapper">
          {minOrderAmount && overallTotal > 0 && overallTotal < minOrderAmount && (
            <div className="qp-min-order-alert-mobile">
              ⚠️ Minimum order is ₹{minOrderAmount} (Add ₹{(minOrderAmount - overallTotal).toFixed(0)})
            </div>
          )}
          <div className="qp-summary-container mobile-bottom-summary">
            <div className="mobile-bottom-info">
              <span className="mobile-item-count">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items</span>
              <span className="mobile-dot-separator">•</span>
              <span className="mobile-total-price">₹{overallTotal.toFixed(0)}</span>
            </div>
            <div className="mobile-bottom-actions">
            <button className="mobile-clear-btn" onClick={clearCart}>Clear</button>
            <button 
              className={`mobile-order-btn ${overallTotal <= 0 || (minOrderAmount && overallTotal < minOrderAmount) ? 'disabled' : ''}`} 
              onClick={() => onNavigate('checkout')}
              disabled={overallTotal <= 0 || (minOrderAmount && overallTotal < minOrderAmount)}
              style={{ opacity: overallTotal <= 0 || (minOrderAmount && overallTotal < minOrderAmount) ? 0.6 : 1 }}
            >
              Order Now
            </button>
          </div>
          </div>
        </div>
      </div>

      <div className="quick-purchase-container">
        <div className="qp-header">
          <h2 className="qp-title">Quick Purchase Order Form</h2>
          <p className="qp-subtitle">Fill in the quantity for the products you want, and your cart will automatically update!</p>
        </div>

        <div className="qp-table-wrapper">
          <table className="qp-wholesale-table">
            <thead>
              <tr>
                <th className="qp-col-img">Image</th>
                <th className="qp-col-name">Product Name</th>
                <th className="qp-col-actual">Actual Price</th>
                <th className="qp-col-price">Price</th>
                <th className="qp-col-qty">Quantity</th>
                <th className="qp-col-total">Total</th>
              </tr>
            </thead>
            <tbody>
              {productsByCategory.map((category) => (
                <React.Fragment key={category.id}>
                  {/* Category Header Row */}
                  <tr className="qp-category-header-row">
                    <td colSpan="6" className="qp-category-header-cell">
                      {category.name.toUpperCase()} (SPECIAL DISCOUNT)
                    </td>
                  </tr>
                  
                  {/* Product Rows */}
                  {category.items.map((product) => {
                    const qty = getQuantity(product.id);
                    const rowTotal = qty ? (product.price * qty) : 0;
                    
                    return (
                      <tr key={product.id} className="qp-product-row">
                        <td className="qp-col-img">
                          <div className="qp-img-box">
                            <ProductIcon type={product.image} />
                          </div>
                        </td>
                        <td className="qp-col-name">
                          <div className="qp-product-name">{product.name}</div>
                          <div className="qp-product-desc-mobile-only">
                            <span className="qp-mob-actual">₹{product.originalPrice}</span>
                            <span className="qp-mob-price">₹{product.price}</span>
                          </div>
                        </td>
                        <td className="qp-col-actual">
                          <div className="qp-actual-price-wrap">
                            <span className="qp-strike-price">₹{product.originalPrice}</span>
                            <span className="qp-unit-text">{product.quantity && product.type ? `${product.quantity} ${product.type}` : '1 pkt'}</span>
                          </div>
                        </td>
                        <td className="qp-col-price">
                          <span className="qp-discounted-price">₹{product.price}</span>
                        </td>
                        <td className="qp-col-qty">
                          {qty > 0 ? (
                            <div className="qp-qty-control-wrapper">
                              <button className="qp-qty-ctrl-btn" onClick={() => onUpdateQuantity(product.id, qty - 1)}>-</button>
                              <span className="qp-qty-ctrl-val">{qty}</span>
                              <button className="qp-qty-ctrl-btn" onClick={() => onUpdateQuantity(product.id, qty + 1)}>+</button>
                            </div>
                          ) : (
                            <button className="qp-add-btn" onClick={() => onUpdateQuantity(product.id, 1)}>
                              + ADD
                            </button>
                          )}
                        </td>
                        <td className="qp-col-total">
                          <span className="qp-row-total">₹{rowTotal.toFixed(2)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
