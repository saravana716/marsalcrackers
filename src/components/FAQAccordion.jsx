import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './FAQAccordion.css';

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How fast is the delivery process?',
      answer: 'Delivery typically takes 2-4 working days depending on your region. We ensure secure packaging to avoid transit damage. You will get a notification on dispatch.'
    },
    {
      question: 'Are these fireworks safe for children?',
      answer: 'Yes, our "Kids Collection" features low-noise, mild sparklers specifically designed for children, though adult supervision is mandatory at all times.'
    },
    {
      question: 'Do you offer any festival special discounts?',
      answer: 'Yes! We run seasonal sales during Diwali, New Year, and other major festivals with competitive factory prices and special bulk discounts.'
    },
    {
      question: 'Can I return my order if I change my mind?',
      answer: 'Due to safety regulations governing explosive materials, we cannot accept returns once the products are delivered successfully.'
    },
    {
      question: 'How do I place and confirm my order?',
      answer: 'Add your desired items to the cart and proceed to checkout. You will be redirected to WhatsApp with your order summary, where our team will confirm availability, provide payment details, and arrange delivery.'
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
          <h2 className="faq-title">Common Inquiries</h2>
          <p className="faq-desc">
            Curious about our delivery process, product quality, or order minimums? Explore our most frequently asked queries right here.
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
