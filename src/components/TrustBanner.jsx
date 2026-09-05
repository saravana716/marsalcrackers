// src/components/TrustBanner.jsx
import React from 'react';
import { ShieldCheck, RefreshCw, BadgeCheck, Globe } from 'lucide-react';
import './TrustBanner.css';

export default function TrustBanner() {
  const items = [
    {
      icon: <ShieldCheck size={28} />,
      title: 'Secure Payments',
      subtitle: '100% secure payment'
    },
    {
      icon: <RefreshCw size={26} />,
      title: 'Easy Returns',
      subtitle: 'Hassle free returns'
    },
    {
      icon: <BadgeCheck size={28} />,
      title: 'Genuine Products',
      subtitle: 'Authorized dealers'
    },
    {
      icon: <Globe size={26} />,
      title: 'Countrywide Shipping',
      subtitle: 'Delivery across India'
    }
  ];

  return (
    <section className="trust-banner-container">
      {items.map((item, index) => (
        <div key={index} className="trust-item-card">
          <div className="trust-icon-box">
            {item.icon}
          </div>
          <div className="trust-text-box">
            <span className="trust-card-title">{item.title}</span>
            <span className="trust-card-subtitle">{item.subtitle}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
