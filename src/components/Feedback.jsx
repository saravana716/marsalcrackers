import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import logoImg from '../assets/mylogo.png';
import './Feedback.css';

export default function Feedback() {
  const testimonials = [
    {
      id: 1,
      name: 'Ramanathan K.',
      location: 'Chennai, Tamil Nadu',
      rating: 5,
      date: 'Oct 2025',
      purchase: 'Gift Boxes & Rockets',
      text: 'The Gift Box Deluxe was a massive hit! 25+ varieties of high quality crackers directly from Sivakasi. Excellent packaging and prompt delivery. Highly recommended for families.'
    },
    {
      id: 2,
      name: 'Priyanka Sharma',
      location: 'Bangalore, Karnataka',
      rating: 5,
      date: 'Nov 2025',
      purchase: 'Sparklers & Flower Pots',
      text: 'Absolutely safe crackers with minimal smoke. The color fountains transitioned beautifully from red to green. My children loved the long-lasting gold sparklers!'
    },
    {
      id: 3,
      name: 'Amit Patel',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      date: 'Nov 2025',
      purchase: 'Sky Shots & Bombs',
      text: 'The Sky Shot Rockets are outstanding! They soar incredibly high and explode into bright green and gold palms. Sai Sparkz Hub is my new go-to crackers website.'
    },
    {
      id: 4,
      name: 'Suresh Kumar',
      location: 'Hyderabad, Telangana',
      rating: 5,
      date: 'Dec 2025',
      purchase: 'Chakkars & Ground Wheels',
      text: 'The Ground Chakkars spun rapidly without any duds. Safe, high quality Sivakasi craftmanship. The customer support on WhatsApp was extremely helpful in choosing items.'
    },
    {
      id: 5,
      name: 'Anjali Desai',
      location: 'Pune, Maharashtra',
      rating: 5,
      date: 'Jan 2026',
      purchase: 'Combo Premium Pack',
      text: 'Ordered the wholesale combo pack for our family wedding. Every single item burnt beautifully. The discount pricing saved us a lot compared to local shops.'
    }
  ];

  return (
    <section className="feedback-section" id="reviews">
      <div className="feedback-container">
        
        {/* Left Side: Summary & Static info */}
        <div className="feedback-text-side">
          <img src={logoImg} alt="Sai Sparkz Hub Logo" className="feedback-logo" />
          <span className="feedback-sublabel">
            <Sparkles size={14} className="sparkle-gold" />
            Customer Reviews
          </span>
          <h2 className="feedback-title">
            Loved By Families Across India
          </h2>
          <p className="feedback-desc">
            Discover real stories and glowing feedback from our happy clients. We bring Sivakasi\'s finest, safest, and most colorful celebrations straight to your doorstep.
          </p>

          {/* Stats Badges */}
          <div className="feedback-stats-row">
            <div className="stat-card">
              <div className="stat-value">
                4.9 
                <Star size={18} fill="var(--color-primary)" color="var(--color-primary)" className="inline-star" />
              </div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">15k+</div>
              <div className="stat-label">Happy Orders</div>
            </div>
          </div>
        </div>

        {/* Right Side: Swiper Cards Animation */}
        <div className="feedback-slider-side">
          <div className="feedback-swiper-wrapper">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay, Pagination]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="feedback-cards-swiper"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="feedback-slide-card">
                    {/* Quote mark ornament */}
                    <Quote className="card-quote-icon" size={40} />

                    {/* Stars */}
                    <div className="card-stars-row">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="var(--color-primary)" color="var(--color-primary)" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="card-feedback-text">"{t.text}"</p>

                    {/* Footer Details */}
                    <div className="card-footer-details">
                      <div className="user-info">
                        <span className="user-name">{t.name}</span>
                        <span className="user-location">{t.location}</span>
                      </div>
                      <div className="purchase-badge">
                        <span>{t.purchase}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </div>
    </section>
  );
}
