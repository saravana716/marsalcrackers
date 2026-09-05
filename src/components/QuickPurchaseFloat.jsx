import React from 'react';
import './QuickPurchaseFloat.css';

export default function QuickPurchaseFloat({ onNavigate }) {
  return (
    <button 
      className="qp-float-btn qp-image-float" 
      onClick={onNavigate}
      aria-label="Quick Purchase Form"
    >
      <img 
        src={new URL('../assets/qucik.png', import.meta.url).href} 
        alt="Quick Purchase" 
        className="qp-float-image-el"
      />
    </button>
  );
}
