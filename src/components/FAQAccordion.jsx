import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './FAQAccordion.css';

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Do you deliver crackers all over India?',
      answer: 'Yes! We ship to all major states and cities across India. Standard shipping takes 3-5 business days depending on your location. Order tracking updates are sent to you directly via SMS and WhatsApp.'
    },
    {
      question: 'Are your crackers CSIR-NEERI certified green crackers?',
      answer: 'Absolutely. All our fireworks are sourced directly from Sivakasi and are 100% CSIR-NEERI certified green crackers. They feature 30-35% lower emissions, low smoke output, and are completely free from banned chemical substances like Barium Nitrate.'
    },
    {
      question: 'Is there a minimum order value or shipping charge?',
      answer: 'We maintain a minimum cart order value of ₹2,000 to facilitate shipping compliance. Orders above ₹5,000 qualify for free express shipping, plus a complimentary surprise gift box containing premium sparklers and flower pots!'
    },
    {
      question: 'How do I place a bulk or wholesale discount order?',
      answer: 'You can tap the "WhatsApp Order" button in the header or use the floating green widget to chat directly with our sales team. We offer customized wholesale price sheets with discounts ranging from 45% to 75% depending on your volume.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'To comply with logistics regulations for firework shipping, we support secure prepaid digital payments including UPI (Google Pay, PhonePe, Paytm), NetBanking, and credit/debit cards. Cash on Delivery (COD) is currently not supported.'
    }
  ];

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // collapse
    } else {
      setActiveIndex(index); // expand
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        
        <div className="faq-header">
          <div className="faq-badge">
            <HelpCircle size={14} />
            <span>Support & FAQs</span>
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-desc">
            Got questions about shipping, green certifications, or bulk discounts? Find answers to the most common queries below.
          </p>
        </div>

        <div className="faq-accordion-list">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                className={`faq-item ${isOpen ? 'open' : ''}`} 
                key={index}
              >
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon-wrapper">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                
                <div 
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
