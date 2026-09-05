import React, { useEffect, useState } from 'react';
import logoImg from '../assets/mylogo.png';
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
    "Igniting Joy, One Spark at a Time",
    "Light Up Your Celebrations",
    "Premium Fireworks for Magical Nights",
    "Let's Make Some Noise!",
    "Bringing the Sky to Life"
  ];

  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className={`splash-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <img src={logoImg} alt="Sai Sparkz Hub" className="splash-logo" />
        <h2 className="splash-quote">{quote}</h2>
        <div className="splash-loader"></div>
      </div>
    </div>
  );
}
