import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import logoImg from '../assets/lo.png';
import './Feedback.css';

export default function Feedback() {
  const testimonials = [
    {
      id: 1,
      name: 'Sneha Reddy',
      location: 'Hyderabad, Telangana',
      rating: 5,
      date: 'Oct 2025',
      purchase: 'Assorted Mega Pack',
      text: 'Our Diwali was truly spectacular thanks to Marsel Traders. The fireworks arrived earlier than expected and were incredibly vibrant. The kids especially loved the multi-color fountains.'
    },
    {
      id: 2,
      name: 'Rohan Gupta',
      location: 'Delhi',
      rating: 5,
      date: 'Nov 2025',
      purchase: 'Night Sky Shots',
      text: 'I ordered the premium aerial shots for a wedding and they did not disappoint! The massive golden willow effects lit up the entire sky. Superb quality and very safe to handle.'
    },
    {
      id: 3,
      name: 'Kavitha M.',
      location: 'Coimbatore, TN',
      rating: 5,
      date: 'Nov 2025',
      purchase: 'Kids Safe Sparklers',
      text: 'Safety is my priority as a mother, and these crackers were perfectly suited for family fun. Minimal smoke, bright colors, and the customer service was phenomenal.'
    },
    {
      id: 4,
      name: 'Vikas Sharma',
      location: 'Jaipur, Rajasthan',
      rating: 5,
      date: 'Dec 2025',
      purchase: 'Wholesale Celebration Kit',
      text: 'Bought in bulk for our society celebration. Every single piece worked perfectly, and we saved a ton of money with the factory rates. Will definitely order again next year.'
    },
    {
      id: 5,
      name: 'Meera Iyer',
      location: 'Chennai, TN',
      rating: 5,
      date: 'Jan 2026',
      purchase: 'Traditional Chakkars',
      text: 'Authentic Sivakasi fireworks delivered right to our door. The spinning wheels and flower pots lasted so long and were beautiful. Thank you for the wonderful experience!'
    }
  ];

  return (
    <section className="feedback-section" id="reviews">
      <div className="feedback-container">
        
        {/* Left Side: Summary & Static info */}
        <div className="feedback-text-side" data-aos="fade-right">
          <img src={logoImg} alt="Marsal Traders Logo" className="feedback-logo" />
          <span className="feedback-sublabel">
            <Sparkles size={14} className="sparkle-gold" />
            Client Testimonials
          </span>
          <h2 className="feedback-title">
            Trusted by Thousands of Happy Customers
          </h2>
          <p className="feedback-desc">
            Hear directly from the people who have experienced the magic of our premium fireworks. We pride ourselves on delivering spectacular, safe, and vibrant celebrations directly to you.
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
        <div className="feedback-slider-side" data-aos="fade-left">
          <div className="feedback-swiper-wrapper">
            <Swiper
              effect={'cube'}
              grabCursor={true}
              loop={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              modules={[EffectCube, Autoplay, Pagination]}
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
