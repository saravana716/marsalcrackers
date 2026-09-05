// src/components/WhyChooseUs.jsx
import React from 'react';
import { ShieldCheck, Truck, Leaf, Star, Award, Headphones, Zap, Gift } from 'lucide-react';
import './WhyChooseUs.css';

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'CSIR-NEERI Certified',
    desc: 'All our crackers are certified green crackers by CSIR-NEERI, ensuring minimal pollution and maximum safety.',
    stat: '100%',
    statLabel: 'Certified Safe'
  },
  {
    icon: <Leaf size={32} />,
    title: 'Eco-Friendly Crackers',
    desc: 'We stock only low-emission, eco-friendly crackers that produce up to 30% less smoke than traditional fireworks.',
    stat: '30%',
    statLabel: 'Less Smoke'
  },
  {
    icon: <Truck size={32} />,
    title: 'Doorstep Delivery',
    desc: 'Pan India delivery right to your doorstep. Fast, secure, and insured shipping across all major cities.',
    stat: '48hr',
    statLabel: 'Fast Dispatch'
  },
  {
    icon: <Award size={32} />,
    title: 'Direct from Sivakasi',
    desc: 'We source crackers directly from the fireworks capital of India — Sivakasi — guaranteeing authenticity and quality.',
    stat: '#1',
    statLabel: 'Source City'
  },
  {
    icon: <Star size={32} />,
    title: '4.9★ Customer Rating',
    desc: 'Thousands of happy families trust us every Diwali. Our commitment to quality speaks through their reviews.',
    stat: '15K+',
    statLabel: 'Happy Orders'
  },
  {
    icon: <Gift size={32} />,
    title: 'Exclusive Gift Boxes',
    desc: 'Beautifully curated gift boxes with assorted crackers — perfect for families, corporate gifting, and special events.',
    stat: '50+',
    statLabel: 'Combo Options'
  },
  {
    icon: <Headphones size={32} />,
    title: '24/7 WhatsApp Support',
    desc: 'Our team is always available on WhatsApp to assist with orders, recommendations, and delivery tracking.',
    stat: '24/7',
    statLabel: 'Live Support'
  },
  {
    icon: <Zap size={32} />,
    title: 'Best Price Guarantee',
    desc: 'We offer wholesale pricing on retail orders. Get the lowest prices without compromising on quality or safety.',
    stat: '20%',
    statLabel: 'Savings Avg.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="wcu-section" id="why-us">
      {/* Background decorative elements */}
      <div className="wcu-bg-orb wcu-orb-left" />
      <div className="wcu-bg-orb wcu-orb-right" />

      <div className="wcu-container">
        {/* Header */}
        <div className="wcu-header">
          <div className="wcu-badge">
            <Award size={14} />
            <span>Why Choose Us</span>
          </div>
          <h2 className="wcu-title">
            The Marsal Traders
            <span className="wcu-title-highlight"> Difference</span>
          </h2>
          <p className="wcu-desc">
            From Sivakasi's finest factories straight to your doorstep — we deliver joy, safety, and the brightest celebrations at the best prices in India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="wcu-grid">
          {features.map((feat, i) => (
            <div className="wcu-card" key={i} style={{ '--i': i }}>
              <div className="wcu-card-inner">
                {/* Icon */}
                <div className="wcu-icon-ring">
                  {feat.icon}
                </div>

                {/* Stat badge */}
                <div className="wcu-stat-badge">
                  <span className="wcu-stat-value">{feat.stat}</span>
                  <span className="wcu-stat-label">{feat.statLabel}</span>
                </div>

                {/* Text */}
                <h3 className="wcu-card-title">{feat.title}</h3>
                <p className="wcu-card-desc">{feat.desc}</p>
              </div>

              {/* Hover glow line */}
              <div className="wcu-card-glow" />
            </div>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="wcu-cta-strip">
          <div className="wcu-cta-text">
            <span className="wcu-cta-big">🎆 Diwali is coming — Don't wait!</span>
            <span className="wcu-cta-small">Order early and get guaranteed delivery before the festive rush.</span>
          </div>
          <a href="#products" className="wcu-cta-btn" onClick={(e) => { e.preventDefault(); document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Shop Now →
          </a>
        </div>
      </div>
    </section>
  );
}
