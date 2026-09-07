// src/components/ContactUs.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import './ContactUs.css';
import contactbanner from "../assets/contact.png"
const INFO_CARDS = [
  {
    icon: <Phone size={24} />,
    title: 'CALL US',
    lines: ['+91 8525858075', '+91 8525858075'],
    cardClass: 'card-pink',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.767.46 3.427 1.267 4.904L2 22l5.244-1.22c1.427.777 3.05 1.232 4.768 1.232C17.52 22.012 22 17.532 22 12.012 22 6.48 17.52 2 12.012 2zm0 18.012c-1.57 0-3.037-.417-4.32-1.144l-.31-.184-3.21.748.766-3.125-.2-.32C3.93 14.73 3.51 13.4 3.51 12.01 3.51 7.33 7.33 3.51 12.01 3.51c4.68 0 8.5 3.82 8.5 8.5 0 4.68-3.82 8.502-8.5 8.502zM16.5 13.5c-.244-.12-1.442-.71-1.666-.79-.224-.084-.388-.12-.55.124-.165.244-.64.79-.785.952-.145.163-.29.183-.537.062-.244-.12-1.034-.38-1.97-1.215-.728-.65-1.22-1.45-1.362-1.696-.145-.244-.015-.376.107-.497.11-.11.244-.286.366-.43.122-.14.163-.242.244-.405.082-.163.04-.306-.02-.43-.06-.12-.55-1.32-.754-1.815-.2-.48-.4-.41-.55-.418h-.47c-.162 0-.427.06-.65.306-.225.245-.858.837-.858 2.04 0 1.2 1.058 2.37 1.2 2.57.143.204 2.083 3.18 5.047 4.46.705.305 1.256.487 1.684.623.708.225 1.353.193 1.863.117.57-.085 1.442-.59 1.644-1.162.2-.57.2-1.06.142-1.162-.058-.1-.223-.16-.467-.28z"/>
      </svg>
    ),
    title: 'WHATSAPP',
    lines: ['Message Us Now', '+91 8525858075'],
    cardClass: 'card-green',
  },
  {
    icon: <MapPin size={24} />,
    title: 'OUR STORE',
    lines: [
      '8P4M+GQ, Appayanaickenpatti,',
      'Sevalpatti,',
      'Tamil Nadu 626140'
    ],
    cardClass: 'card-purple',
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const intervalRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Auto-slide every 2.5s on mobile
  useEffect(() => {
    if (!isMobile) return;
    intervalRef.current = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % INFO_CARDS.length);
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, [isMobile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact-page" id="contact">
      {/* Hero Banner */}
      <div className="contact-hero">
        <img src={contactbanner} alt="" />
      </div>

      <div className="contact-body">
        {/* Info Cards — Desktop: grid, Mobile: auto-slider */}
        {isMobile ? (
          <div className="contact-cards-slider">
            <div
              className="contact-cards-track"
              style={{ transform: `translateX(-${activeCard * 100}%)` }}
            >
              {INFO_CARDS.map((card, i) => (
                <div className={`contact-info-card contact-info-card--slide ${card.cardClass}`} key={i}>
                  <div className="contact-card-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  {card.lines.map((line, j) => <p key={j} className={j === 0 && card.cardClass === 'card-green' ? 'wa-message-text' : ''}>{line}</p>)}
                </div>
              ))}
            </div>
            {/* Dot indicators */}
            <div className="contact-slider-dots">
              {INFO_CARDS.map((_, i) => (
                <button
                  key={i}
                  className={`contact-slider-dot ${i === activeCard ? 'active' : ''}`}
                  onClick={() => setActiveCard(i)}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="contact-cards-row">
            {INFO_CARDS.map((card, i) => (
              <div className={`contact-info-card ${card.cardClass}`} key={i}>
                <div className="contact-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                {card.lines.map((line, j) => <p key={j} className={j === 0 && card.cardClass === 'card-green' ? 'wa-message-text' : ''}>{line}</p>)}
              </div>
            ))}
          </div>
        )}

        {/* Main Content: Form + Map */}
        <div className="contact-main-grid">
          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="contact-form-title">Send Us a Message</h2>
            <p className="contact-form-sub">Fill in the form below and we'll get back to you within 24 hours.</p>

            {submitted && (
              <div className="contact-success-banner">
                ✅ Thank you! Your message has been sent. We'll get back to you shortly.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-phone">Phone Number</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-inquiry-type">Inquiry Type</label>
                <select
                  id="contact-inquiry-type"
                  name="inquiryType"
                  value={form.inquiryType || 'Diwali 2026 Wholesale Booking'}
                  onChange={handleChange}
                  className="contact-select"
                >
                  <option value="Diwali 2026 Wholesale Booking">Diwali 2026 Wholesale Booking</option>
                  <option value="Bulk Family / Community Order">Bulk Family / Community Order</option>
                  <option value="Corporate / Institution Crackers Gift Box">Corporate / Institution Crackers Gift Box</option>
                  <option value="Transport & Delivery Status Inquiry">Transport & Delivery Status Inquiry</option>
                  <option value="Other Inquiries">Other Inquiries</option>
                </select>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message">Your Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell us about your enquiry, bulk order, or any question..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="contact-submit-btn">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          <div className="contact-map-col">
            <div className="contact-map-card contact-map-card--stretch">
              <h3>Find Us on Map</h3>
              <div className="contact-map-embed contact-map-embed--stretch">
                <iframe
                  title="Marsal Traders Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.2!2d77.8!3d9.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSivakasi%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
