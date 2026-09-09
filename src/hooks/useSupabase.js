import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Map colors and icons for categories to keep existing UI styling
const categoryStyles = {
  'Sparklers': { iconName: 'sparklers', color: '#FFD700' },
  'Flower Pots': { iconName: 'flower-pots', color: '#001A3A' },
  'Rockets': { iconName: 'rockets', color: '#00FFFF' },
  'Chakkars': { iconName: 'chakkars', color: '#FF00FF' },
  'Fountains': { iconName: 'fountains', color: '#FF9F43' },
  'Ground Chakkars': { iconName: 'ground-chakkars', color: '#00FF00' },
  'Bombs': { iconName: 'bombs', color: '#FF3333' },
  'Fancy Crackers': { iconName: 'fancy-crackers', color: '#A020F0' },
  'Gift Boxes': { iconName: 'gift-boxes', color: '#F1C40F' },
  'Combo Packs': { iconName: 'combo-packs', color: '#1ABC9C' },
  'Kids Collection': { iconName: 'kids-collection', color: '#FF69B4' }
};

const getCategoryStyle = (name) => {
  return categoryStyles[name] || { iconName: 'sparklers', color: '#888888' };
}

export function useStoreData() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marqueeText, setMarqueeText] = useState('');
  const [minOrderAmount, setMinOrderAmount] = useState(2000);
  const [priceListUrl, setPriceListUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (catError) throw catError;
        
        const formattedCategories = catData.map(c => ({
          ...c,
          iconName: getCategoryStyle(c.name).iconName,
          color: getCategoryStyle(c.name).color,
          image_url: c.image_url
        }));

        const { data: prodData, error: prodError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });
          
        if (prodError) throw prodError;

        const formattedProducts = prodData.map(p => {
          const cat = formattedCategories.find(c => c.id === p.category_id);
          return {
            id: p.id,
            name: p.name,
            category: p.category_id,
            categoryName: cat ? cat.name : 'Unknown',
            price: Number(p.price),
            originalPrice: p.original_price ? Number(p.original_price) : Number(p.price) * 1.5,
            rating: 4.8, 
            reviews: 120,
            image: p.image_url, 
            tag: p.stock > 0 ? (p.stock < 10 ? 'Low Stock' : 'Trending') : 'Out of Stock',
            desc: p.description,
            safetyInfo: 'Handle with care. Follow safety instructions.',
            stock: p.stock,
            type: p.type || '',
            quantity: p.quantity || ''
          };
        });
        
        const { data: galleryData, error: galleryError } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (galleryError) throw galleryError;
        
        const formattedGallery = galleryData.map(v => ({
          id: v.id,
          title: v.title,
          category: 'Crackers',
          videoUrl: v.video_url,
          embedUrl: v.video_url, // fallback
          thumbnail: v.thumbnail_url || 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=500&auto=format&fit=crop', // Default thumbnail if none provided
          thumbnail_url: v.thumbnail_url,
          desc: v.title
        }));



        const { data: marqueeData, error: marqueeErr } = await supabase
          .from('marquee')
          .select('*')
          .eq('active', true)
          .limit(1);
          
        if (marqueeErr) console.error('Error fetching marquee:', marqueeErr);
        if (marqueeData && marqueeData.length > 0) {
          setMarqueeText(marqueeData[0].text);
        }

        const { data: settingsData, error: settingsErr } = await supabase
          .from('settings')
          .select('*')
          .eq('key', 'min_order_amount')
          .limit(1);
          
        if (settingsErr) console.error('Error fetching settings:', settingsErr);
        if (settingsData && settingsData.length > 0) {
          setMinOrderAmount(Number(settingsData[0].value));
        }

        const { data: priceListData, error: priceListErr } = await supabase
          .from('price_list')
          .select('file_url')
          .limit(1);
          
        if (priceListErr) console.error('Error fetching price list:', priceListErr);
        if (priceListData && priceListData.length > 0) {
          setPriceListUrl(priceListData[0].file_url);
        }

        setCategories(formattedCategories);
        setProducts(formattedProducts);
        setGalleryVideos(formattedGallery);
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { categories, products, galleryVideos, loading, error, marqueeText, minOrderAmount, priceListUrl };
}
