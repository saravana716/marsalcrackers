// src/components/Offers.jsx
import React from 'react';
import './Offers.css';

export default function Offers({ onBannerClick }) {
  const handleBannerClick = (type) => {
    if (onBannerClick) {
      onBannerClick(type);
    }
  };

  return (
    <section className="offers-grid-container" id="offers">
      {/* Banner 1: Diwali Special Offer */}
      <div 
        className="offer-banner-card banner-combos"
        onClick={() => handleBannerClick('rockets')}
      >
        <div className="offer-card-glow"></div>
        {/* Left Text */}
        <div className="offer-content-wrapper">
          <div className="offer-text-block">
            <span className="offer-tag tag-combos">Diwali</span>
            <h4 className="offer-heading-text">SPECIAL OFFER<br/><span className="heading-sublabel">UP TO</span></h4>
            <span className="offer-sub-label">20% OFF</span>
          </div>
          <button className="offer-banner-button" aria-label="Shop Diwali special offers">Shop Now</button>
        </div>
        {/* Right Graphic: Fan of standing rockets */}
        <div className="offer-banner-graphic">
          <svg viewBox="0 0 100 100" className="banner-graphic-svg graphic-rocket" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="offRocketRed" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C0392B" />
                <stop offset="50%" stopColor="#E74C3C" />
                <stop offset="100%" stopColor="#962D22" />
              </linearGradient>
              <linearGradient id="offRocketBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1F3A60" />
                <stop offset="50%" stopColor="#34495E" />
                <stop offset="100%" stopColor="#0B1D37" />
              </linearGradient>
              <linearGradient id="offRocketGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B37D14" />
                <stop offset="50%" stopColor="#F1C40F" />
                <stop offset="100%" stopColor="#9A6E0F" />
              </linearGradient>
            </defs>
            {/* Sparkle background */}
            <circle cx="50" cy="80" r="14" fill="#FF8C00" opacity="0.3" filter="blur(4px)"/>

            {/* Left Rocket (Blue) */}
            <g transform="rotate(-30 30 80)">
              <line x1="30" y1="50" x2="30" y2="85" stroke="#D2B48C" strokeWidth="2" />
              <rect x="25" y="50" width="10" height="24" fill="url(#offRocketBlue)" stroke="#F1C40F" strokeWidth="0.5" />
              <path d="M25 50 L30 38 L35 50 Z" fill="#E74C3C" />
            </g>

            {/* Right Rocket (Gold) */}
            <g transform="rotate(30 70 80)">
              <line x1="70" y1="50" x2="70" y2="85" stroke="#D2B48C" strokeWidth="2" />
              <rect x="65" y="50" width="10" height="24" fill="url(#offRocketGold)" stroke="#FFF" strokeWidth="0.5" />
              <path d="M65 50 L70 38 L75 50 Z" fill="#E74C3C" />
            </g>

            {/* Center Main Rocket (Red) */}
            <g transform="translate(0, -6)">
              <line x1="50" y1="44" x2="50" y2="84" stroke="#D2B48C" strokeWidth="2.5" />
              <rect x="44" y="44" width="12" height="28" fill="url(#offRocketRed)" stroke="#F1C40F" strokeWidth="0.75" />
              <path d="M44 44 L50 30 L56 44 Z" fill="url(#offRocketGold)" />
            </g>

            {/* Exploding sparks from fuses */}
            <circle cx="50" cy="84" r="2.5" fill="#FFF" />
            <line x1="50" y1="84" x2="44" y2="92" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="50" y1="84" x2="56" y2="92" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="34" cy="80" r="1.5" fill="#FFD700" />
            <circle cx="66" cy="80" r="1.5" fill="#FFD700" />
          </svg>
        </div>
      </div>

      {/* Banner 2: Combo Offer */}
      <div 
        className="offer-banner-card banner-diwali"
        onClick={() => handleBannerClick('combo-packs')}
      >
        <div className="offer-card-glow"></div>
        {/* Left Text */}
        <div className="offer-content-wrapper">
          <div className="offer-text-block">
            <span className="offer-tag tag-diwali">Combo Offer</span>
            <h4 className="offer-heading-text">BUY MORE</h4>
            <span className="offer-sub-label">SAVE MORE</span>
          </div>
          <button className="offer-banner-button" aria-label="Shop combo packs now">Shop Now</button>
        </div>
        {/* Right Graphic: Stack of pots and boxes */}
        <div className="offer-banner-graphic">
          <svg viewBox="0 0 100 100" className="banner-graphic-svg graphic-diya" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="offPotGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E824C" />
                <stop offset="50%" stopColor="#2ECC71" />
                <stop offset="100%" stopColor="#145A32" />
              </linearGradient>
              <linearGradient id="offBoxRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#001A3A" />
                <stop offset="100%" stopColor="#C0392B" />
              </linearGradient>
            </defs>
            {/* Box package bottom left */}
            <rect x="22" y="58" width="34" height="24" rx="2" fill="url(#offBoxRed)" stroke="#F1C40F" strokeWidth="0.75" />
            <rect x="22" y="58" width="34" height="6" fill="#F1C40F" />

            {/* Little pot in middle */}
            <path d="M42 78 L50 48 L58 78 Z" fill="url(#offPotGreen)" stroke="#F1C40F" strokeWidth="0.75" />
            <ellipse cx="50" cy="48" rx="3.5" ry="1" fill="#D35400" />

            {/* Large pot on right */}
            <path d="M58 80 L68 38 L78 80 Z" fill="linear-gradient(135deg, #FFD700 0%, #B8860B 100%)" stroke="#FFF" strokeWidth="1" />
            <ellipse cx="68" cy="38" rx="4" ry="1.5" fill="#C0392B" />
            
            {/* Spark points on top of pots */}
            <circle cx="50" cy="45" r="1.5" fill="#FFD700" />
            <circle cx="68" cy="33" r="2" fill="#FFD700" />
            <line x1="68" y1="33" x2="68" y2="27" stroke="#FF7A00" strokeWidth="1.5" />
            <line x1="68" y1="33" x2="74" y2="31" stroke="#FF7A00" strokeWidth="1.5" />
            <line x1="68" y1="33" x2="62" y2="31" stroke="#FF7A00" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Banner 3: Festival Mega Sale */}
      <div 
        className="offer-banner-card banner-new"
        onClick={() => handleBannerClick('sparklers')}
      >
        <div className="offer-card-glow"></div>
        {/* Left Text */}
        <div className="offer-content-wrapper">
          <div className="offer-text-block">
            <span className="offer-tag tag-new">Festival</span>
            <h4 className="offer-heading-text">MEGA SALE</h4>
            <span className="offer-sub-label">LIMITED TIME OFFER</span>
          </div>
          <button className="offer-banner-button" aria-label="Shop sparklers now">Shop Now</button>
        </div>
        {/* Right Graphic: Sparkler explosion starburst */}
        <div className="offer-banner-graphic">
          <svg viewBox="0 0 100 100" className="banner-graphic-svg graphic-rocket" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="offersSparkGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
                <stop offset="30%" stopColor="#FFD700" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#FF8C00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Spark stick */}
            <line x1="20" y1="80" x2="52" y2="48" stroke="#E0E0E0" strokeWidth="3" strokeLinecap="round" />
            <line x1="38" y1="62" x2="52" y2="48" stroke="#34495E" strokeWidth="6" strokeLinecap="round" />

            {/* Glowing Burst Center */}
            <circle cx="52" cy="48" r="20" fill="url(#offersSparkGlow)" />
            <circle cx="52" cy="48" r="4" fill="#FFF" />

            {/* Spark Rays */}
            <line x1="52" y1="48" x2="72" y2="28" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
            <line x1="52" y1="48" x2="78" y2="48" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="52" y1="48" x2="64" y2="68" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
            <line x1="52" y1="48" x2="36" y2="32" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="52" y1="48" x2="32" y2="54" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" />
            <line x1="52" y1="48" x2="52" y2="20" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="52" y1="48" x2="58" y2="26" stroke="#FF7A00" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="52" y1="48" x2="68" y2="58" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" />

            {/* Star spark particles */}
            <circle cx="76" cy="24" r="1.5" fill="#FFF" />
            <circle cx="82" cy="48" r="2" fill="#FFD700" />
            <circle cx="68" cy="72" r="1" fill="#FFF" />
            <circle cx="28" cy="28" r="1.5" fill="#FFD700" />
            <circle cx="52" cy="14" r="2" fill="#FFF" />
          </svg>
        </div>
      </div>
    </section>
  );
}
