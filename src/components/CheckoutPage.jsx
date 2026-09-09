import React, { useState, useEffect } from 'react';
import { ShoppingCart, CheckCircle, ArrowLeft, Send, Plus, Minus, Trash, ShieldCheck } from 'lucide-react';
import { ProductIcon } from './ProductCard';
import './CheckoutPage.css';

const generateOrderId = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const dateString = `${yyyy}${mm}${dd}`;
  const timeString = `${hours}${minutes}${seconds}`;
  
  return `MT-${dateString}-${timeString}`;
};

export default function CheckoutPage({ cartItems, onNavigate, clearCart, onUpdateQuantity, onRemoveItem, onCheckoutSubmit }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});

  const originalTotal = cartItems.reduce((acc, item) => acc + (item.product.originalPrice * item.quantity), 0);
  const subTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const savings = originalTotal - subTotal;

  const netTotal = subTotal;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\s+/g, ''))) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid. Create order data object
      const orderDetails = {
        customer: formData,
        items: cartItems,
        subTotal: subTotal,
        netTotal: netTotal,
        savings: savings,
        originalTotal: originalTotal,
        orderId: generateOrderId()
      };

      // Pass order details up and navigate to payment page
      if (onCheckoutSubmit) {
        onCheckoutSubmit(orderDetails);
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page-container">
        <div className="empty-checkout-msg">
          <ShoppingCart size={48} color="#CBD5E0" style={{ margin: '0 auto 15px' }} />
          <h3>Your Cart is Empty</h3>
          <p>Please add some products to your cart before proceeding to checkout.</p>
          <button className="back-to-shop-btn" onClick={() => onNavigate('products')}>
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-content">

        {/* Left Column: Order Summary */}
        <div className="checkout-summary-section">
          <h2 className="checkout-section-title">
            <ShoppingCart size={22} /> Order Summary
          </h2>

          <div className="checkout-items-list">
            {cartItems.map((item) => (
              <div key={item.product.id} className="checkout-item">
                <div className="checkout-item-main">
                  <div className="checkout-item-left">
                    <div className="checkout-item-img-wrapper">
                      <ProductIcon type={item.product.image} color1="#FFD700" color2="#001A3A" />
                    </div>
                    <div className="checkout-item-info">
                      <span className="checkout-item-name">
                        {item.product.name}
                        {item.product.quantity && item.product.type && (
                          <span style={{ marginLeft: '6px', fontSize: '0.8rem', color: '#666', fontWeight: 'normal' }}>
                            ({item.product.quantity} {item.product.type})
                          </span>
                        )}
                      </span>
                      <div className="checkout-item-qty-controls">
                        <button
                          type="button"
                          className="checkout-qty-btn checkout-qty-minus"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          title="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="checkout-qty-display">{item.quantity}</span>
                        <button
                          type="button"
                          className="checkout-qty-btn checkout-qty-plus"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          title="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="checkout-item-price-col">
                    <div className="checkout-item-price">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      type="button"
                      className="checkout-remove-btn"
                      onClick={() => onRemoveItem(item.product.id)}
                      title="Remove item"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-totals">
            <div className="checkout-total-row">
              <span>Original Value</span>
              <span style={{ textDecoration: 'line-through' }}>₹{originalTotal.toFixed(2)}</span>
            </div>
            <div className="checkout-total-row checkout-savings">
              <span>Total Savings</span>
              <span>- ₹{savings.toFixed(2)}</span>
            </div>

            <div className="checkout-total-row grand-total">
              <span>Net Total</span>
              <span>₹{netTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Form */}
        <div className="checkout-form-section">
          <h2 className="checkout-section-title">
            <CheckCircle size={22} /> Shipping Details
          </h2>

          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group full-width">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                inputMode="numeric"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group full-width">
              <label>Delivery Address *</label>
              <input
                type="text"
                name="address"
                className={`form-input ${errors.address ? 'error' : ''}`}
                value={formData.address}
                onChange={handleChange}
                placeholder="House No, Street, Area"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                className={`form-input ${errors.city ? 'error' : ''}`}
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                className={`form-input ${errors.pincode ? 'error' : ''}`}
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                inputMode="numeric"
              />
              {errors.pincode && <span className="error-message">{errors.pincode}</span>}
            </div>

            <button type="submit" className="checkout-submit-btn" style={{ background: 'var(--color-text-dark)', color: '#FFD700' }}>
              <ShieldCheck size={20} /> Confirm Order & Pay
            </button>
            <button type="button" className="checkout-submit-btn" style={{ background: 'var(--color-bg-light-alt)', color: '#333', marginTop: '0', boxShadow: 'none' }} onClick={() => onNavigate('products')}>
              <ArrowLeft size={20} /> Back to Products
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
