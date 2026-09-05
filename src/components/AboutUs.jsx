import React from 'react';
import {
  ShieldCheck, Truck, Sparkles, Zap, Award, Target,
  MapPin, Phone, Clock, Users, Heart, CheckCircle,
  Package, Star, ThumbsUp
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './AboutUs.css';
import logoImg from '../assets/mylogo.png';
import visionImg from '../assets/vi.jpeg';
import missionImg from '../assets/mission.jpeg';
import productBgImg from '../assets/premium_photo-1731329153268-40b257da9240.jpeg';
import bannerBgImg from '../assets/about.jpeg';
import ctaBgImg from '../assets/nihal-prabhudesai-YVgpxEQOdjY-unsplash.jpeg';
import FireworkBurst from './FireworkBurst';

// Shop Images
import s1 from '../assets/s1.jpeg';
import s2 from '../assets/s2.jpeg';
import s3 from '../assets/s3.jpeg';
import s4 from '../assets/s4.jpeg';
import s5 from '../assets/s5.jpeg';
import s6 from '../assets/s6.jpeg';
import s7 from '../assets/s7.jpeg';
import s8 from '../assets/s8.jpeg';
import s9 from '../assets/s9.jpeg';
import s10 from '../assets/s10.jpeg';
import shobImg from '../assets/shob img.jpeg';

export default function AboutUs() {
  const whyChooseUs = [
    {
      id: 1,
      icon: <Award className="feature-glow-icon" />,
      title: "100% Original Brands",
      desc: "Authentic Sivakasi crackers directly from renowned manufacturers."
    },
    {
      id: 2,
      icon: <Zap className="feature-glow-icon" />,
      title: "Best Wholesale Prices",
      desc: "Get incredible discounts on premium combo boxes for families."
    },
    {
      id: 3,
      icon: <Truck className="feature-glow-icon" />,
      title: "Pan India Delivery",
      desc: "Fast, safe, and secure doorstep delivery across the country."
    },
    {
      id: 4,
      icon: <ShieldCheck className="feature-glow-icon" />,
      title: "CSIR-NEERI Certified",
      desc: "Eco-friendly green crackers with 70% reduced chemical emissions."
    }
  ];

  const productTypes = [
    { name: "Sparklers", icon: "✨", color: "#FFD700" },
    { name: "Flower Pots", icon: "🌋", color: "#FF5722" },
    { name: "Ground Chakkars", icon: "🌀", color: "#00E676" },
    { name: "Sky Shots", icon: "🚀", color: "#2979FF" },
    { name: "Garlands (Walas)", icon: "🎊", color: "#F50057" },
    { name: "Kids Combos", icon: "🎁", color: "#9C27B0" },
    { name: "Fancy Fountains", icon: "⛲", color: "#00E5FF" },
    { name: "Family Packs", icon: "🎇", color: "#FF3D00" },
  ];

  const teamMembers = [
    { id: 1, name: "Raja Kumar", role: "Founder & CEO", initials: "RK" },
    { id: 2, name: "Sunil Sharma", role: "Head of Operations", initials: "SS" },
    { id: 3, name: "Priya Devi", role: "Customer Success", initials: "PD" }
  ];

  const shopImages = [shobImg, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

  return (
    <div className="about-page-wrapper">

      {/* 1. Simple About Us Banner */}
      <section
        className="about-simple-banner"
        style={{
          background: `url(${bannerBgImg}) center/cover no-repeat`,
        }}
      >

      </section>

      {/* 2. Our Story */}
      <section className="about-story-section bg-white">
        <div className="about-us-container">
          <div className="story-editorial-layout">

            <div className="story-visual-area">
              <div className="modern-logo-display">
                <img src={shobImg} alt="Sai Sparkz Hub Shop" className="modern-shop-img" />
              </div>
            </div>

            <div className="story-text-area">
              <span className="eyebrow">The Heritage</span>
              <h2 className="section-title-light">Our Legacy of Light</h2>
              <p className="story-paragraph-light story-lead">
                Rooted in Sivakasi—the fireworks capital of India—<strong className="text-amber">Sai Sparkz Hub</strong> began with a powerful vision: to transform every celebration into a mesmerizing spectacle of joy, while ensuring safety and affordability for every family.
              </p>
              <p className="story-paragraph-light">
                From a humble local distributor, we have evolved into India's most trusted premium fireworks brand. We bring the magic of Sivakasi directly to your doorstep, delivering spectacular quality without the premium price tag.
              </p>

              <div className="modern-stats-grid-wrapper">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={20}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    }
                  }}
                  className="stats-swiper"
                >
                  <SwiperSlide>
                    <div className="modern-stat-card">
                      <div className="stat-icon-floating"><Star size={24} /></div>
                      <span className="stat-num">10+</span>
                      <span className="stat-text">Years of Joy</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="modern-stat-card">
                      <div className="stat-icon-floating"><ShieldCheck size={24} /></div>
                      <span className="stat-num">100<span style={{ fontSize: '1.2rem' }}>%</span></span>
                      <span className="stat-text">Authentic Brands</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="modern-stat-card">
                      <div className="stat-icon-floating"><Truck size={24} /></div>
                      <span className="stat-num">100<span style={{ fontSize: '1.2rem' }}>%</span></span>
                      <span className="stat-text">Safe Delivery</span>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Vision & Mission (Dark Theme ZigZag) */}
      <section className="about-mission-section dark-fireworks-bg">
        <div className="about-us-container relative z-10">

          {/* Vision Row */}
          <div className="zigzag-row">
            <div className="zigzag-visual">
              <h2 className="section-title-gold">Our Vision</h2>
              <div className="zigzag-image-wrapper">
                <img src={visionImg} alt="Our Vision" className="zigzag-img" />
                <div className="zigzag-image-overlay"></div>
              </div>
            </div>
            <div className="zigzag-content">
              <p className="mission-statement-light">
                "To become a trusted and leading fireworks brand, bringing <span>safe</span>, <span>high-quality</span>, <span>innovative</span>, and joyful celebrations to families while creating memorable moments for every occasion."
              </p>
            </div>
          </div>

          {/* Mission Row */}
          <div className="zigzag-row reverse">
            <div className="zigzag-content">
              <p className="mission-statement-light">
                "To deliver <span>premium-quality</span> crackers at <span>affordable</span> prices, with a strong focus on <span>safety</span>, <span>reliability</span>, <span>customer satisfaction</span>, and <span>responsible celebrations</span>. We aim to continuously improve our products and provide every customer with a bright and happy experience through Sai Sparkz Hub."
              </p>
            </div>
            <div className="zigzag-visual text-right">
              <h2 className="section-title-gold">Our Mission</h2>
              <div className="zigzag-image-wrapper">
                <img src={missionImg} alt="Our Mission" className="zigzag-img" />
                <div className="zigzag-image-overlay"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="about-why-us-section bg-white">
        <div className="about-us-container">
          <div className="text-center mb-50">
            <h2 className="section-title-light">Why Choose Us</h2>
            <p className="story-paragraph-light">What makes Sai Sparkz Hub the preferred choice for thousands of families.</p>
          </div>
          <div className="features-light-grid-wrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Autoplay]}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 4, spaceBetween: 20 }
              }}
              className="features-swiper"
            >
              {whyChooseUs.map((item) => (
                <SwiperSlide key={item.id} style={{ paddingBottom: '20px' }}>
                  <div className="feature-light-card" style={{ height: '100%' }}>
                    <div className="icon-wrapper-light">
                      {item.icon}
                    </div>
                    <h4 className="feature-title-light">{item.title}</h4>
                    <p className="feature-desc-light">{item.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 5. Our Products (Commented out for now)
      <section
        className="about-products-section"
        style={{
          background: `url(${productBgImg}) center/cover no-repeat`,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
        <div className="about-us-container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <div className="text-center mb-50">
            <h2 className="section-title-dark">Our Products</h2>
            <p className="story-paragraph-light" style={{ color: '#E0E0E0' }}>A vast variety of premium fireworks for every kind of celebration.</p>
          </div>

          <div className="products-swiper-wrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                576: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                992: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
              }}
              modules={[Pagination, Autoplay]}
              className="standard-product-swiper"
            >
              {productTypes.map((prod, idx) => (
                <SwiperSlide key={idx} style={{ padding: '20px 10px 40px 10px' }}>
                  <div
                    className="standard-product-card"
                    style={{
                      '--hover-color': prod.color,
                      '--hover-bg': `${prod.color}33`,
                      '--hover-glow': `${prod.color}22`
                    }}
                  >
                    <div className="std-icon-wrapper">
                      <span className="std-icon">{prod.icon}</span>
                    </div>
                    <h3 className="std-name">{prod.name}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>
      */}

      {/* 6. Our Shop Gallery */}
      <section className="about-shop-gallery-section bg-white" style={{ padding: '60px 0' }}>
        <div className="about-us-container">
          <div className="text-center mb-50">
            <h2 className="section-title-light">Our Shop Gallery</h2>
            <p className="story-paragraph-light">Take a virtual tour of Sai Sparkz Hub.</p>
          </div>
          <div className="shop-gallery-wrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 30 }
              }}
              className="shop-gallery-swiper"
            >
              {shopImages.map((imgSrc, idx) => (
                <SwiperSlide key={idx} style={{ paddingBottom: '40px' }}>
                  <div className="shop-gallery-card" style={{ height: '300px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                    <img src={imgSrc} alt={`Shop Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* 7. Our Values */}
      <section className="about-values-section bg-white">
        <div className="about-us-container">
          <div className="text-center mb-50">
            <h2 className="section-title-light">Our Core Values</h2>
            <p className="story-paragraph-light">The principles that guide our business everyday.</p>
          </div>
          <div className="values-grid-wrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Autoplay]}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 30 }
              }}
              className="values-swiper"
            >
              <SwiperSlide style={{ paddingBottom: '20px' }}>
                <div className="value-card" style={{ height: '100%' }}>
                  <Heart className="value-icon" />
                  <h3>Integrity</h3>
                  <p>Honest pricing with zero hidden fees. What you see is exactly what you pay.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ paddingBottom: '20px' }}>
                <div className="value-card" style={{ height: '100%' }}>
                  <Star className="value-icon" />
                  <h3>Premium Quality</h3>
                  <p>We never compromise on the quality of our crackers. Only the best brands make it to our catalog.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ paddingBottom: '20px' }}>
                <div className="value-card" style={{ height: '100%' }}>
                  <ThumbsUp className="value-icon" />
                  <h3>Reliability</h3>
                  <p>When we promise a delivery date, we stick to it. We know how important your festival timings are.</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>



      {/* 10. Visit Us / Contact Us */}
      <section
        className="about-contact-section"
        style={{
          background: `url(${ctaBgImg}) center/cover no-repeat`,
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 0 }}></div>
        <div className="about-us-container text-center" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="section-title-dark">Ready to Light Up Your Celebrations?</h2>
          <p className="contact-subtitle">Visit our warehouse or order online today!</p>

          <div className="contact-info-flex">
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <h4>Our Location</h4>
              <p>Virudhunagar–Sivakasi Main Road,<br />Near Kia Showroom, Opp. Nayara Bulk,<br />Amathur, Virudhunagar – 626005,</p>
              <p>Tamil Nadu</p>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <h4>Call Us</h4>
              <p>+91 89400 98344<br />Mon-Sun: 9:00 AM - 9:00 PM</p>
            </div>
            <div className="contact-item">
              <Clock className="contact-icon" />
              <h4>Order Timings</h4>
              <p>24/7 Online Ordering<br />Fast Dispatch Guarantee</p>
            </div>
          </div>

          <a href="https://wa.me/918940098344" target="_blank" rel="noopener noreferrer" className="btn-whatsapp-large">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.767.46 3.427 1.267 4.904L2 22l5.244-1.22c1.427.777 3.05 1.232 4.768 1.232C17.52 22.012 22 17.532 22 12.012 22 6.48 17.52 2 12.012 2zm0 18.012c-1.57 0-3.037-.417-4.32-1.144l-.31-.184-3.21.748.766-3.125-.2-.32C3.93 14.73 3.51 13.4 3.51 12.01 3.51 7.33 7.33 3.51 12.01 3.51c4.68 0 8.5 3.82 8.5 8.5 0 4.68-3.82 8.502-8.5 8.502zM16.5 13.5c-.244-.12-1.442-.71-1.666-.79-.224-.084-.388-.12-.55.124-.165.244-.64.79-.785.952-.145.163-.29.183-.537.062-.244-.12-1.034-.38-1.97-1.215-.728-.65-1.22-1.45-1.362-1.696-.145-.244-.015-.376.107-.497.11-.11.244-.286.366-.43.122-.14.163-.242.244-.405.082-.163.04-.306-.02-.43-.06-.12-.55-1.32-.754-1.815-.2-.48-.4-.41-.55-.418h-.47c-.162 0-.427.06-.65.306-.225.245-.858.837-.858 2.04 0 1.2 1.058 2.37 1.2 2.57.143.204 2.083 3.18 5.047 4.46.705.305 1.256.487 1.684.623.708.225 1.353.193 1.863.117.57-.085 1.442-.59 1.644-1.162.2-.57.2-1.06.142-1.162-.058-.1-.223-.16-.467-.28z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
