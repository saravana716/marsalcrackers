// src/components/Categories.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import './Categories.css';

export default function Categories({ categories = [], activeCategory, onCategoryChange }) {
  const sliderItems = [...categories];

  return (
    <section className="categories-section" id="categories">
      <div className="categories-capsule-card">
        {/* Header */}
        <div className="categories-card-header">
          <div className="categories-header-text">
            <span className="categories-card-sublabel">Browse Assortment</span>
            <h3 className="categories-card-title">Crackers Directory</h3>
          </div>
          <div className="categories-header-nav">
            <button
              className="view-all-header-btn"
              onClick={() => onCategoryChange('all')}
              title="View all categories"
              aria-label="View all categories"
            >
              <span>View All</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
              </svg>
            </button>
            <button className="categories-arrow-btn cat-prev-btn" title="Previous" aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="categories-arrow-btn cat-next-btn" title="Next" aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="categories-slider-outer">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: '.cat-prev-btn', nextEl: '.cat-next-btn' }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={false}
            className="categories-swiper"
            breakpoints={{
              320:  { slidesPerView: 2,   spaceBetween: 12 },
              480:  { slidesPerView: 3,   spaceBetween: 14 },
              768:  { slidesPerView: 4,   spaceBetween: 16 },
              1024: { slidesPerView: 5,   spaceBetween: 20 },
            }}
          >
            {sliderItems.map((category) => (
              <SwiperSlide key={category.id}>
                <div
                  className={`cat-card ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => onCategoryChange(category.id)}
                >
                  {/* Image Area */}
                  <div className="cat-card-img-wrap">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="cat-card-img"
                      />
                    ) : (
                      <svg viewBox="0 0 100 100" className="cat-card-svg" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="40" fill="#FFD700" opacity="0.15" />
                        <polygon points="50,20 65,40 85,45 70,60 75,80 50,70 25,80 30,60 15,45 35,40" fill="#F4AE00" />
                      </svg>
                    )}
                    {/* Golden shimmer overlay on hover */}
                    <div className="cat-card-overlay" />
                  </div>

                  {/* Label */}
                  <div className="cat-card-label">
                    <span className="cat-card-name" title={category.name}>{category.name}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
