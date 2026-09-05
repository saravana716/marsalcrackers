import React, { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import './VideoGallery.css';

export default function VideoGallery({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="video-gallery-section" id="crackers-action">
      <div className="video-gallery-container">
        
        {/* Section Header */}
        <div className="video-header-row">
          <div className="video-header-text">
            <span className="video-section-sublabel">
              <Sparkles size={14} className="sparkle-gold" />
              Watch Crackers Burn
            </span>
            <h2 className="video-section-title">
              Crackers In Action
            </h2>
          </div>

          {/* Swiper Arrow buttons on the right */}
          <div className="video-header-nav">
            <button className="video-arrow-btn vid-prev-btn" aria-label="Previous video">
              <ChevronLeft size={20} />
            </button>
            <button className="video-arrow-btn vid-next-btn" aria-label="Next video">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Video Slider (Swiper Carousel) */}
        <div className="video-slider-outer">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: '.vid-prev-btn',
              nextEl: '.vid-next-btn',
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="video-swiper"
            breakpoints={{
              320: {
                slidesPerView: 1.25,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 1.6,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 25,
              }
            }}
          >
            {videos.map((vid) => (
              <SwiperSlide key={vid.id}>
                <div 
                  className="video-item-card"
                  onClick={() => setActiveVideo(vid)}
                >
                  {/* Card Video section (used as live thumbnail) */}
                  <div className="video-card-thumb" style={{ padding: 0 }}>
                    {vid.thumbnail_url ? (
                      <img 
                        src={vid.thumbnail_url} 
                        alt={vid.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      vid.embedUrl?.includes('supabase.co/storage') || vid.embedUrl?.endsWith('.mp4') ? (
                        <video
                          src={vid.embedUrl}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <iframe 
                          src={`${vid.embedUrl}?background=1&mute=1&loop=1`} 
                          title={vid.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                        ></iframe>
                      )
                    )}
                    <span className="video-card-tag">{vid.category}</span>
                    <div className="video-play-overlay">
                      <div className="play-button-circle">
                        <Play size={20} fill="#FFF" className="play-icon-svg" />
                      </div>
                    </div>
                  </div>

                  {/* Card Meta Content */}
                  <div className="video-card-details">
                    <h3 className="video-card-title">{vid.title}</h3>
                    <p className="video-card-desc">{vid.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Lightbox Modal overlay */}
        {activeVideo && (
          <div className="video-lightbox-overlay" onClick={() => setActiveVideo(null)}>
            <div className="video-lightbox-content" onClick={(e) => e.stopPropagation()}>
              
              {/* Close Button */}
              <button 
                className="lightbox-close-btn"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video player"
              >
                <X size={22} />
              </button>

              {/* Responsive Video Wrapper */}
              <div className="lightbox-video-frame">
                {activeVideo.embedUrl?.includes('supabase.co/storage') || activeVideo.embedUrl?.endsWith('.mp4') ? (
                  <video
                    src={activeVideo.embedUrl}
                    controls
                    autoPlay
                    style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                  />
                ) : (
                  <iframe 
                    src={`${activeVideo.embedUrl}?autoplay=1`} 
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                )}
              </div>

              {/* Lightbox Meta content */}
              <div className="lightbox-video-details">
                <span className="lightbox-video-tag">{activeVideo.category}</span>
                <h3 className="lightbox-video-title">{activeVideo.title}</h3>
                <p className="lightbox-video-desc">{activeVideo.desc}</p>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
