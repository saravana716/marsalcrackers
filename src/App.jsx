// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import FeatureBadges from './components/FeatureBadges';
import Categories from './components/Categories';
import PackageCards from './components/PackageCards';
import Offers from './components/Offers';
import BestSellers from './components/BestSellers';
import TrustBanner from './components/TrustBanner';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import WhatsAppFloat from './components/WhatsAppFloat';
import VideoGallery from './components/VideoGallery';
import Feedback from './components/Feedback';
import FestiveCountdown from './components/FestiveCountdown';
import SafetyGuide from './components/SafetyGuide';
import FAQAccordion from './components/FAQAccordion';
import WhyChooseUs from './components/WhyChooseUs';
import ProductsPage from './components/ProductsPage';
import QuickPurchasePage from './components/QuickPurchasePage';
import QuickPurchaseFloat from './components/QuickPurchaseFloat';
import CheckoutPage from './components/CheckoutPage';
import ContactUs from './components/ContactUs';
import PaymentModal from './components/PaymentPage'; // Reusing the file but renaming import
import SplashScreen from './components/SplashScreen';
import LegalPage from './components/LegalPage';
import { useStoreData } from './hooks/useSupabase';
import './App.css';

export default function App() {
  const { categories, products, galleryVideos, loading, error, marqueeText, minOrderAmount } = useStoreData();

  // Splash screen state
  const [showSplash, setShowSplash] = useState(true);

  // Page routing state
  const [currentPage, setCurrentPage] = useState('home');

  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('saisparks_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('saisparks_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Remove stale products from cart if they no longer exist in the database
  useEffect(() => {
    if (products && products.length > 0) {
      setCartItems(prev => {
        const validItems = prev.filter(item => 
          products.some(p => p.id === item.product.id)
        );
        // Only update state if items were actually removed to avoid infinite loops
        if (validItems.length !== prev.length) {
          return validItems;
        }
        return prev;
      });
    }
  }, [products]);

  // Order state (used to pass data from checkout to payment/invoice)
  const [orderData, setOrderData] = useState(null);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Category filtering state
  const [activeCategory, setActiveCategory] = useState('all');

  // Quick view state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Default cracker videos list
  const DEFAULT_VIDEOS = [
    {
      id: 1,
      title: 'Golden Sparklers Burning',
      category: 'Sparklers',
      embedUrl: 'https://www.youtube.com/embed/5F687pB8m04',
      thumbnail: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=500&auto=format&fit=crop',
      desc: 'Mesmerizing shower of gold sparks crackling in the night. Perfect for family celebrations.'
    },
    {
      id: 2,
      title: 'Deluxe Flower Pots Fountain',
      category: 'Flower Pots',
      embedUrl: 'https://www.youtube.com/embed/nZBOPl2nSsg',
      thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop',
      desc: 'A magnificent fountain of crackling gold sparks resembling a shining firework tree.'
    },
    {
      id: 3,
      title: 'Multi-Color Aerial Shots',
      category: 'Rockets',
      embedUrl: 'https://www.youtube.com/embed/3R-Q9p0aCgQ',
      thumbnail: 'https://images.unsplash.com/photo-1507502707541-f369a3b18502?w=500&auto=format&fit=crop',
      desc: 'Spectacular bursts of vibrant red, green, and gold aerial explosions lighting up the sky.'
    }
  ];

  // Videos state (persisted in localStorage)
  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('cracker_videos');
    return saved ? JSON.parse(saved) : DEFAULT_VIDEOS;
  });

  const handleAddVideo = (newVideo) => {
    setVideos((prev) => {
      const updated = [newVideo, ...prev];
      localStorage.setItem('cracker_videos', JSON.stringify(updated));
      return updated;
    });
  };

  // Cart Handlers
  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      alert(`Sorry, ${product.name} is currently out of stock.`);
      return;
    }
    
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert(`You cannot add more than ${product.stock} of ${product.name}.`);
          return prevItems;
        }
        return prevItems.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === productId);
      
      // We need the product reference to check stock limit
      const productToCheck = existingItem ? existingItem.product : products.find((p) => p.id === productId);
      
      if (productToCheck && newQuantity > productToCheck.stock) {
        alert(`You cannot add more than ${productToCheck.stock} of ${productToCheck.name}.`);
        return prevItems;
      }

      if (existingItem) {
        return prevItems.map((item) => 
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // If it's not in the cart, find the product from the global catalog and add it
        if (productToCheck) {
          return [...prevItems, { product: productToCheck, quantity: newQuantity }];
        }
        return prevItems;
      }
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckoutSubmit = (orderDetails) => {
    setOrderData(orderDetails);
    setCurrentPage('payment');
    window.scrollTo(0, 0);
  };

  // Wishlist Handler
  const handleWishlistToggle = (productId) => {
    setWishlist((prevWishlist) => 
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  const handleCategoryChange = (catId, navigateToProducts = false) => {
    setActiveCategory(catId);
    
    if (navigateToProducts || currentPage !== 'products') {
      setCurrentPage('products');
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <div className={`app-container ${showSplash ? 'loading' : ''}`} style={{ height: showSplash ? '100vh' : 'auto', overflow: showSplash ? 'hidden' : 'visible' }}>
        {/* Background Animated Sparks */}
        <div className="fireworks-bg"></div>

      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onResetFilters={handleResetFilters}
        marqueeText={marqueeText}
        minOrderAmount={minOrderAmount}
      />

      <main className="main-content">
        {loading ? (
          <div className="loading-spinner" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <div className="spinner" style={{width: '50px', height: '50px', border: '5px solid rgba(255,255,255,0.1)', borderTopColor: '#f1c40f', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
          </div>
        ) : error ? (
          <div className="error-message" style={{textAlign: 'center', color: '#ff3333', padding: '2rem'}}>
            <h2>Error loading data</h2>
            <p>{error}</p>
          </div>
        ) : currentPage === 'home' ? (
          <>



            {/* 1. HERO — First impression, call to action */}
            <Hero
              onShopNowClick={() => handleCategoryChange('all')}
              minOrderAmount={minOrderAmount}
            />
            
            {/* NEW: FLASH SALE BANNER — High conversion attractive section */}

            {/* 2. FEATURE BADGES — Instant trust: delivery, quality, safety */}
            <FeatureBadges />

            {/* 3. CATEGORIES — Help customer find what they want fast */}
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* 4. BEST SELLERS — Core product grid, most important shopping area */}
            <BestSellers
              products={products}
              activeCategory={activeCategory}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onWishlistToggle={handleWishlistToggle}
              wishlist={wishlist}
              onQuickView={(prod) => setSelectedProduct(prod)}
              onResetFilters={handleResetFilters}
            />

            {/* 5. PACKAGE CARDS — Gift Boxes & Family Combos replacing Offers */}
            <PackageCards onCategorySelect={handleCategoryChange} categories={categories} />



            {/* 4. TRUST BANNER — Guarantees to remove purchase hesitation */}
            <TrustBanner />

            {/* WHY CHOOSE US — New attractive section to convert customers */}
            <WhyChooseUs />

            {/* 5. SAFETY GUIDE — Educational value, positions brand as responsible */}
            <SafetyGuide />

            {/* 6. FAQ — Handle common objections and queries */}
            <FAQAccordion />

            {/* 7. VIDEO GALLERY — Social proof and product demonstration */}
            <VideoGallery
              videos={galleryVideos && galleryVideos.length > 0 ? galleryVideos : videos}
              onAddVideo={handleAddVideo}
            />

            {/* 8. FEEDBACK — Customer reviews */}
            <Feedback />
          </>
        ) : currentPage === 'about' ? (
          <AboutUs />
        ) : currentPage === 'products' ? (
          <ProductsPage 
            categories={categories}
            products={products}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onWishlistToggle={handleWishlistToggle}
            wishlist={wishlist}
            onQuickView={(prod) => setSelectedProduct(prod)}
            onResetFilters={handleResetFilters}
          />
        ) : currentPage === 'quick-purchase' ? (
          <QuickPurchasePage 
            categories={categories}
            products={products}
            cartItems={cartItems}
            minOrderAmount={minOrderAmount}
            onUpdateQuantity={handleUpdateQuantity}
            onNavigate={(page) => {
              if (page === 'checkout' && minOrderAmount && cartTotal < minOrderAmount) {
                alert(`Minimum order amount is ₹${minOrderAmount}. Your current total is ₹${cartTotal.toFixed(2)}.`);
                return;
              }
              setCurrentPage(page);
            }}
            clearCart={handleClearCart}
          />
        ) : currentPage === 'checkout' ? (
          <CheckoutPage 
            cartItems={cartItems}
            onNavigate={setCurrentPage}
            clearCart={handleClearCart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckoutSubmit={handleCheckoutSubmit}
          />
        ) : currentPage === 'contact' ? (
          <ContactUs />
        ) : currentPage === 'payment' ? (
          <PaymentModal
            orderData={orderData}
            onNavigate={(page) => {
              setOrderData(null);
              setCurrentPage(page);
            }}
            clearCart={handleClearCart}
          />
        ) : currentPage.startsWith('legal-') ? (
          <LegalPage pageType={currentPage.replace('legal-', '')} />
        ) : null}
      </main>

      {/* Footer */}
      <Footer 
        onCategoryChange={handleCategoryChange}
        onNavigate={setCurrentPage}
      />

      {/* Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        total={cartTotal}
        minOrderAmount={minOrderAmount}
        onCheckoutClick={() => {
          if (cartTotal >= minOrderAmount) {
            setIsCartOpen(false);
            setCurrentPage('checkout');
          } else {
            alert(`Minimum order amount is ₹${minOrderAmount}. Your current total is ₹${cartTotal}.`);
          }
        }}
      />

      {/* Product Quick View Details Overlay */}
      <QuickViewModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Interactive WhatsApp Help Button */}
      <WhatsAppFloat />

      {/* Payment page is now a routed standalone page, not a modal */}
      
      {/* Quick Purchase Floating Button */}
      <QuickPurchaseFloat onNavigate={() => {
        setCurrentPage('quick-purchase');
        window.scrollTo(0, 0);
      }} />
    </div>
    </>
  );
}
