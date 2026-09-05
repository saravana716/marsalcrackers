// src/components/Categories.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './Categories.css';

// Helper function to return dynamic image from DB or fallback
const getCategoryGraphic = (category) => {
  if (category.image_url) {
    return <img src={category.image_url} alt={category.name} className="category-card-image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />;
  }
  
  // Fallback vector SVG if no image is present in DB
  return (
    <svg viewBox="0 0 100 100" className="category-svg-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill={category.color || "#FFD700"} opacity="0.2" />
      <polygon points="50,20 65,40 85,45 70,60 75,80 50,70 25,80 30,60 15,45 35,40" fill="#FF8C00" />
    </svg>
  );
};

export default function Categories({ categories = [], activeCategory, onCategoryChange }) {
  // Categories list for slider
  const sliderItems = [...categories];

  return (
    <section className="categories-section" id="categories">
      {/* Luxury Capsule Container */}
      <div className="categories-capsule-card">
        {/* Card Header inside the capsule with navigation arrows on the right */}
        <div className="categories-card-header">
          <div className="categories-header-text">
            <span className="categories-card-sublabel">Explore Collections</span>
            <div className="categories-title-wrapper">
              <h3 className="categories-card-title">Shop By Category</h3>
            </div>
          </div>

          {/* Header Action Controls */}
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
            <button 
              className="categories-arrow-btn cat-prev-btn" 
              title="Slide categories left"
              aria-label="Slide categories left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="categories-arrow-btn cat-next-btn" 
              title="Slide categories right"
              aria-label="Slide categories right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="categories-slider-outer">
          {/* Swiper Slider Shell */}
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: '.cat-prev-btn',
              nextEl: '.cat-next-btn',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={false}
            className="categories-swiper"
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 3.2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 5.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {/* Render dynamic category items as SwiperSlides */}
            {sliderItems.map((category) => (
              <SwiperSlide key={category.id}>
                <div 
                  className={`category-circle-wrapper ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => onCategoryChange(category.id)}
                  style={{ '--color-primary': category.color }}
                >
                  <div className="category-circle">
                    <div className="category-graphic-container">
                      {getCategoryGraphic(category)}
                    </div>
                    <span className="category-inline-label" title={category.name}>{category.name}</span>
                  </div>
                  <span className="category-label-text" title={category.name}>{category.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

