// src/components/Footer.jsx
import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import logoImg from '../assets/lo.png';
import './Footer.css';

export default function Footer({ onCategoryChange, onNavigate }) {
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onCategoryChange) onCategoryChange('all');
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-container" id="footer">
      <div className="footer-grid">
        {/* Col 1: About */}
        <div className="footer-brand-section">
          <a href="#home" className="footer-logo" onClick={handleLogoClick}>
            <img src={logoImg} alt="Marsal Traders Logo" className="footer-logo-image" />
          </a>
          <p className="footer-brand-desc">
            We bring happiness, sparkle, and light to your festive celebrations with the finest, safest, and highest quality wholesale crackers directly from Sivakasi.
          </p>

        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <a href="#home" onClick={handleLogoClick}>Home</a>
            </li>
            <li className="footer-link-item">
              <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a>
            </li>
            <li className="footer-link-item">
              <a href="#products" onClick={(e) => { e.preventDefault(); onCategoryChange('all', true); }}>Products</a>
            </li>
            <li className="footer-link-item">
              <a href="#quick-purchase" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('quick-purchase'); window.scrollTo(0, 0); }}>Quick Purchase</a>
            </li>
            <li className="footer-link-item">
              <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('contact'); window.scrollTo(0, 0); }}>Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal */}
        <div>
          <h4 className="footer-heading">Legal Info</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item"><a href="#privacy" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('legal-privacy'); }}>Privacy Policy</a></li>
            <li className="footer-link-item"><a href="#terms" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('legal-terms'); }}>Terms &amp; Conditions</a></li>
            <li className="footer-link-item"><a href="#shipping" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('legal-shipping'); }}>Shipping / Delivery Policy</a></li>
            <li className="footer-link-item"><a href="#cancellation" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('legal-cancellation'); }}>Cancellation Policy</a></li>
            <li className="footer-link-item"><a href="#disclaimer" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('legal-disclaimer'); }}>Disclaimer</a></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div>
          <h4 className="footer-heading">Contact Us</h4>
          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><MapPin size={18} /></span>
              <span>Virudhunagar–Sivakasi Main Road, Near Kia Showroom, Opp. Nayara Bulk, Amathur, Virudhunagar – 626005, Tamil Nadu</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><Phone size={16} /></span>
              <span>+91 89400 98344, +91 89400 98342</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><Mail size={16} /></span>
              <span>saisparkzhub@gmail.com</span>
            </div>
          </div>
          <div className="footer-socials">
            <a href="https://www.facebook.com/people/Saisparkzhub/61593639390020/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Visit our Facebook page">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/saisparkzhub?igsi=MWxpMHJmdGo0amViMA%3D%3D" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Visit our Instagram page">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Visit our YouTube channel">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p className="footer-copyright-text">
            © {new Date().getFullYear()} Marsal Traders. All Rights Reserved.
          </p>
          <p className="footer-developer-text">
            Designed & Developed by Nexsun Technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
