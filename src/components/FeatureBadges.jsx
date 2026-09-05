// src/components/FeatureBadges.jsx
import React, { useState, useEffect } from 'react';
import { Award, Package, Truck, Tag, Headphones } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import './FeatureBadges.css';

export default function FeatureBadges() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const features = [
    {
      icon: <Award size={28} />,
      title: '100% Original Products',
      desc: 'Authorised & trusted brand crackers',
    },
    {
      icon: <Package size={28} />,
      title: 'Safe Packaging',
      desc: 'Premium quality waterproof packing',
    },
    {
      icon: <Truck size={28} />,
      title: 'Fast Delivery',
      desc: 'Timely delivery all over India',
    },
    {
      icon: <Tag size={28} />,
      title: 'Best Price Guarantee',
      desc: 'Get the best prices in the market',
    },
    {
      icon: <Headphones size={28} />,
      title: '24/7 Customer Support',
      desc: 'We are here to help you anytime',
    }
  ];

  return (
    <section className="features-section-outer">
      {isMobile ? (
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="features-swiper"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2.2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            }
          }}
        >
          {features.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={`feature-badge-card ${item.themeClass}`} style={{ width: '100%' }}>
                <div className="feature-icon-container">
                  {item.icon}
                </div>
                <div className="feature-text-container">
                  <h4 className="feature-title">{item.title}</h4>
                  <p className="feature-desc">{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="features-row">
          {features.map((item, index) => (
            <div key={index} className={`feature-badge-card ${item.themeClass}`}>
              <div className="feature-icon-container">
                {item.icon}
              </div>
              <div className="feature-text-container">
                <h4 className="feature-title">{item.title}</h4>
                <p className="feature-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
