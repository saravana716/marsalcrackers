import React, { useState, useEffect, useCallback } from 'react';
import banner1 from '../assets/banner1.jpeg';
import banner2 from '../assets/banner2.jpeg';
import banner3 from '../assets/banner3.jpeg';
import './Hero.css';

const banners = [banner1, banner2, banner3];

export default function Hero({ onShopNowClick }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  }, [animating]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const handlePrev = () => goTo(current === 0 ? banners.length - 1 : current - 1);
  const handleNext = () => goTo((current + 1) % banners.length);

  return (
    <section className="hero-banner-section" id="hero">
      {/* Banner Images */}
      <div className={`hero-banner-wrapper ${animating ? 'hero-fade-out' : 'hero-fade-in'}`}>
        <img
          src={banners[current]}
          alt={`Sai Sparkz Hub Banner ${current + 1}`}
          className="hero-banner-img"
        />
        {/* Dark overlay for readability */}
        <div className="hero-banner-overlay" />
      </div>

      {/* Prev / Next Arrow Controls */}
      <button
        className="hero-arrow hero-arrow-prev"
        onClick={handlePrev}
        aria-label="Previous Banner"
      >
        &#8249;
      </button>
      <button
        className="hero-arrow hero-arrow-next"
        onClick={handleNext}
        aria-label="Next Banner"
      >
        &#8250;
      </button>

      {/* Dot Indicators */}
      <div className="hero-dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'hero-dot-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to banner ${i + 1}`}
          />
        ))}
      </div>

      {/* CTA Button */}
      {/* <div className="hero-cta-bar">
        <button className="hero-cta-btn" onClick={onShopNowClick}>
          Shop Now
        </button>
      </div> */}
    </section>
  );
}
