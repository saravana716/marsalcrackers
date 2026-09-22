import React from 'react';
import './HowToOrderModal.css';
import howToOrderVideo from '../assets/vidssave.com Color changing sky shot _ 15th August _ vfx _ sivakasi crackers testing video _ 2024 240P.mp4';

export default function HowToOrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="how-to-order-overlay" onClick={onClose}>
      <div className="how-to-order-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>
        
        <div className="hto-header">
          <h2>How to Order</h2>
          <p>Follow these simple steps to get your favorite crackers delivered!</p>
        </div>

        <div className="hto-right-col" style={{ width: '100%' }}>
          <div className="hto-video-container">
            <video 
              src={howToOrderVideo} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="hto-video"
            />
          </div>
          <div className="hto-footer">
            <button className="hto-btn" onClick={onClose}>
              Start Shopping Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
