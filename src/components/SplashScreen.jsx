import React, { useEffect, useState } from 'react';
import logoImg from '../assets/lo.png';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Ensure splash shows for at least 1.5 seconds even if load is fast
      setTimeout(() => {
        setIsFading(true);
        setTimeout(onComplete, 500); // match CSS fade-out duration
      }, 1500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback in case load takes too long
      const fallback = setTimeout(handleLoad, 3500);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, [onComplete]);

  const quotes = [
    "Welcome to Marsel Traders",
    "Direct from Sivakasi to Your Doorstep",
    "Experience the Golden Sparkle",
    "The Premium Cracker Destination",
    "Lighting Up Your Diwali Safely"
  ];

  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className={`splash-screen ${isFading ? 'fade-out' : ''}`}>
      {/* Fireworks Background */}
      <div className="fireworks-container">
        <div className="firework fw-1"></div>
        <div className="firework fw-2"></div>
        <div className="firework fw-3"></div>
        <div className="firework fw-4"></div>
        <div className="firework fw-5"></div>
        <div className="firework fw-6"></div>
      </div>

      <div className="splash-content">
        <img src={logoImg} alt="Marsel Traders" className="splash-logo" />
        <h2 className="splash-quote">{quote}</h2>
        <div className="splash-loader"></div>
      </div>
    </div>
  );
}
