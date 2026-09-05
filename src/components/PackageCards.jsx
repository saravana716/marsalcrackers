import React from 'react';
import './PackageCards.css';

export default function PackageCards({ onCategorySelect, categories = [] }) {
  // Try to find the actual category IDs from the Supabase categories data
  const getCategoryId = (keywords) => {
    const found = categories.find(c => 
      keywords.some(keyword => c.name.toLowerCase().includes(keyword.toLowerCase()))
    );
    return found ? found.id : keywords[0]; // Fallback to keyword if not found
  };

  const giftBoxId = getCategoryId(['gift box', 'giftbox', 'gift', 'box']);
  const familyPackId = getCategoryId(['combo pack', 'family pack', 'combo', 'pack']);

  return (
    <section className="package-cards-section">
      <div className="package-cards-header">
        <p className="package-cards-subtitle">Choose the right package for your family, event or wholesale requirement.</p>
      </div>
      
      <div className="package-cards-grid">
        {/* Gift Boxes Card */}
        <div className="package-card gift-box-card">
          <div className="package-card-glow"></div>
          <div className="package-tag">FAMILY FAVOURITE</div>
          
          <div className="package-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="package-icon"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
          </div>
          
          <div className="package-content">
            <svg viewBox="0 0 100 100" className="package-illustration" width="60" height="60" style={{marginBottom: '15px'}}>
              <rect x="25" y="40" width="50" height="45" fill="#D4AF37"/>
              <rect x="20" y="30" width="60" height="15" fill="#C0392B"/>
              <rect x="45" y="30" width="10" height="55" fill="#C0392B"/>
              <path d="M30 30 Q45 10 50 30 Q55 10 70 30" fill="none" stroke="#C0392B" strokeWidth="4"/>
            </svg>
            <h3 className="package-title">Gift Boxes</h3>
            <p className="package-desc">Colourful assortments designed for complete family celebrations.</p>
            
            <ul className="package-features">
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg> Multiple size options</li>
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg> Family-friendly collections</li>
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg> Factory-direct pricing</li>
            </ul>
            
            <button className="package-explore-btn btn-yellow" onClick={() => onCategorySelect(giftBoxId)}>
              Explore Products
            </button>
          </div>
        </div>

        {/* Family Combo Packs Card */}
        <div className="package-card family-combo-card">
          <div className="package-card-glow"></div>
          <div className="package-tag">FESTIVAL SPECIAL</div>
          
          <div className="package-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="package-icon"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          </div>
          
          <div className="package-content">
            <svg viewBox="0 0 100 100" className="package-illustration" width="60" height="60" style={{marginBottom: '15px'}}>
              <rect x="25" y="25" width="50" height="50" fill="#2C3E50"/>
              <rect x="30" y="30" width="40" height="40" fill="#FFF"/>
              <path d="M50 70 L50 30 M30 50 L70 50 M35 35 L65 65 M35 65 L65 35" stroke="#E74C3C" strokeWidth="2"/>
            </svg>
            <h3 className="package-title">Family Combo Packs</h3>
            <p className="package-desc">Ready-to-order combinations with popular crackers for every age group.</p>
            
            <ul className="package-features">
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg> Selected product combinations</li>
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg> Ideal for family celebrations</li>
              <li><svg viewBox="0 0 24 24" className="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg> Latest catalogue prices</li>
            </ul>
            
            <button className="package-explore-btn btn-white" onClick={() => onCategorySelect(familyPackId)}>
              Explore Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
