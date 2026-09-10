// src/data/mockData.js

export const categories = [
  { id: 'sparklers', name: 'Sparklers', iconName: 'sparklers', color: '#FFD700' },
  { id: 'flower-pots', name: 'Flower Pots', iconName: 'flower-pots', color: '#001A3A' },
  { id: 'rockets', name: 'Rockets', iconName: 'rockets', color: '#00FFFF' },
  { id: 'chakkars', name: 'Chakkars', iconName: 'chakkars', color: '#FF00FF' },
  { id: 'fountains', name: 'Fountains', iconName: 'fountains', color: '#FF9F43' },
  { id: 'ground-chakkars', name: 'Ground Chakkars', iconName: 'ground-chakkars', color: '#00FF00' },
  { id: 'bombs', name: 'Bombs', iconName: 'bombs', color: '#FF3333' },
  { id: 'fancy-crackers', name: 'Fancy Crackers', iconName: 'fancy-crackers', color: '#A020F0' },
  { id: 'gift-boxes', name: 'Gift Boxes', iconName: 'gift-boxes', color: '#F1C40F' },
  { id: 'combo-packs', name: 'Combo Packs', iconName: 'combo-packs', color: '#1ABC9C' },
  { id: 'kids-collection', name: 'Kids Collection', iconName: 'kids-collection', color: '#FF69B4' }
];

export const products = [
  {
    id: 1,
    name: 'Gold Sparklers (10 Pcs)',
    category: 'sparklers',
    price: 180.00,
    originalPrice: 270.00,
    rating: 4.8,
    reviews: 142,
    image: 'sparkler', // Identifier for custom SVG/CSS drawing
    tag: 'Trending',
    desc: 'Golden sparkling wires that emit crackling sparks, perfect for family celebrations. Safe and easy to use.',
    safetyInfo: 'Hold from the wire end. Light the tip using a candle or sparkler. Keep away from face.'
  },
  {
    id: 2,
    name: 'Deluxe Flower Pot (Big)',
    category: 'flower-pots',
    price: 230.00,
    originalPrice: 350.00,
    rating: 4.9,
    reviews: 215,
    image: 'flowerpot',
    tag: 'Best Seller',
    desc: 'Emits a beautiful, tall fountain of golden sparks resembling a flower tree. A Diwali classic.',
    safetyInfo: 'Place on level ground. Stand at a safe distance after lighting. Do not hold in hand.'
  },
  {
    id: 3,
    name: 'Sky Shot Rocket',
    category: 'rockets',
    price: 450.00,
    originalPrice: 500.00,
    rating: 4.7,
    reviews: 98,
    image: 'rocket',
    tag: 'Trending',
    desc: 'Soars high into the night sky and bursts into a spectacular display of multi-colored stars.',
    safetyInfo: 'Place in a sturdy launch tube. Ensure sky clear above. Light fuse and step back immediately.'
  },
  {
    id: 4,
    name: 'Ground Chakkar (10 Pcs)',
    category: 'chakkars',
    price: 280.00,
    originalPrice: 380.00,
    rating: 4.6,
    reviews: 164,
    image: 'chakkar',
    tag: 'Kids Favorite',
    desc: 'Spins rapidly on the ground, creating a circular wheel of fire with dazzling white sparks.',
    safetyInfo: 'Place on smooth ground. Light the center and retreat. Avoid touching when spinning.'
  },
  {
    id: 5,
    name: 'Color Fountains (2 Pcs)',
    category: 'fountains',
    price: 280.00,
    originalPrice: 360.00,
    rating: 4.8,
    reviews: 120,
    image: 'fountain',
    tag: 'New',
    desc: 'Compact cylinder fountains that emit dense, vivid colorful sparks transitioning from red to green.',
    safetyInfo: 'Place outdoors on concrete. Do not lean over the fountain when lighting. Stand 5 meters away.'
  },
  {
    id: 6,
    name: 'Gift Box Deluxe',
    category: 'gift-boxes',
    price: 900.00,
    originalPrice: 1200.00,
    rating: 5.0,
    reviews: 310,
    image: 'giftbox',
    tag: 'Premium Pack',
    desc: 'Curated box containing 25+ varieties of popular sparklers, pots, chakkars, and sound crackers.',
    safetyInfo: 'Contains multiple cracker types. Read instructions on individual items inside the box.'
  },
  {
    id: 7,
    name: 'Atom Bomb (5 Pcs)',
    category: 'bombs',
    price: 150.00,
    originalPrice: 200.00,
    rating: 4.5,
    reviews: 87,
    image: 'bomb',
    tag: 'Loud Sound',
    desc: 'High decibel sound cracker that creates a thrilling thunder effect. For outdoor open spaces only.',
    safetyInfo: 'Keep away from ears. Light with a long incense stick. Use in open areas. Keep away from dry leaves.'
  },
  {
    id: 8,
    name: 'Fancy Crackers Multi-Shot',
    category: 'fancy-crackers',
    price: 650.00,
    originalPrice: 850.00,
    rating: 4.9,
    reviews: 73,
    image: 'fancyshot',
    tag: 'Sky Show',
    desc: '12 shots of rapid sky-bursting crackers with glitter and palm tree effects. Absolute stunner.',
    safetyInfo: 'Secure the base block with bricks. Light from side. Do not check if a shot fails to launch.'
  },
  {
    id: 9,
    name: 'Marsel Traders Ultimate Festival Pack',
    category: 'combo-packs',
    price: 1999.00,
    originalPrice: 2999.00,
    rating: 4.9,
    reviews: 520,
    image: 'combopack',
    tag: 'Mega Deal',
    desc: 'The ultimate fireworks bundle designed for a complete family show. Includes high-altitude aerials, ground spinners, and sparklers.',
    safetyInfo: 'Adult supervision mandatory. Fire in open fields only. Use the included safety safety-wick.'
  },
  {
    id: 10,
    name: 'Sparkling Stars (Kids)',
    category: 'kids-collection',
    price: 120.00,
    originalPrice: 180.00,
    rating: 4.8,
    reviews: 105,
    image: 'kidscollection',
    tag: 'Low Noise',
    desc: 'Extremely safe, colorful, smoke-free handheld sparklers made specifically for young children under supervision.',
    safetyInfo: 'For use by kids 5+ under direct adult supervision. Wear cotton clothing.'
  }
];

