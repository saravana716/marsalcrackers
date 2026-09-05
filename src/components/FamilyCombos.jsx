// src/components/FamilyCombos.jsx
import React from 'react';
import './FamilyCombos.css';

export default function FamilyCombos({ onCategorySelect, categories = [] }) {
  // Try to find the actual category IDs from the Supabase categories data
  const getCategoryId = (keywords) => {
    const found = categories.find(c => 
      keywords.some(keyword => c.name.toLowerCase().includes(keyword.toLowerCase()))
    );
    return found ? found.id : keywords[0]; // Fallback to keyword if not found
  };

  const giftBoxId = getCategoryId(['gift box', 'giftbox', 'gift', 'box']);
  const familyPackId = getCategoryId(['combo pack', 'family pack', 'combo', 'pack']);

  const combos = [
    {
      id: giftBoxId,
      title: "Premium Gift Boxes",
      desc: "Beautifully packed assortments, perfect for corporate gifting and visiting relatives.",
      price: "From ₹999",
      features: ["30+ Items", "Handpicked selection", "Premium packaging"],
      icon: "🎁"
    },
    {
      id: familyPackId,
      title: "Mega Family Combos",
      desc: "Complete celebration packages designed to keep the whole family entertained for hours.",
      price: "From ₹2499",
      features: ["50+ Items", "Kids safe included", "High aerial shots"],
      icon: "👨‍👩‍👧‍👦",
      isPopular: true
    },
    {
      id: 'custom',
      title: "Wholesale Bulk Orders",
      desc: "Buying for a large event or society? Get exclusive wholesale factory pricing.",
      price: "Upto 50% Off",
      features: ["Minimum ₹10,000", "Custom assortments", "Priority shipping"],
      icon: "🏢"
    }
  ];

  return (
    <section className="family-combos-section" id="combos">
      <div className="combos-container">
        
        <div className="combos-header">
          <span className="combos-subtitle">Curated For You</span>
          <h2 className="combos-title">Exclusive <span className="text-gold-gradient">Diwali Combos</span></h2>
          <p className="combos-desc">Save time and money with our pre-packed celebration boxes. Direct from Sivakasi.</p>
        </div>

        <div className="combos-grid">
          {combos.map((combo, idx) => (
            <div className={`combo-card ${combo.isPopular ? 'combo-popular' : ''}`} key={idx}>
              {combo.isPopular && <div className="combo-badge">Most Popular</div>}
              
              <div className="combo-icon-wrap">
                <span className="combo-emoji">{combo.icon}</span>
              </div>
              
              <h3 className="combo-card-title">{combo.title}</h3>
              <p className="combo-card-desc">{combo.desc}</p>
              
              <div className="combo-price-tag">{combo.price}</div>
              
              <ul className="combo-features">
                {combo.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                className="combo-cta-btn"
                onClick={() => onCategorySelect(combo.id)}
              >
                View Packages
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
