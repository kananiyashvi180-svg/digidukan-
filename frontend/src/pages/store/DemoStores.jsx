import SEO from '../../components/common/SEO';
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, ArrowRight, Store } from 'lucide-react';

const DEMO_STORES = [
  {
    name: "Ram Kirana Store",
    category: "Groceries",
    slug: "ram-kirana",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=400",
    rating: 4.8,
    color: "#16a34a"
  },
  {
    name: "Village Bakery",
    category: "Bakery & Sweets",
    slug: "village-bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
    rating: 4.9,
    color: "#ea580c"
  },
  {
    name: "Laxmi Tea Stall",
    category: "Cafe",
    slug: "laxmi-tea",
    image: "https://images.unsplash.com/photo-1544787210-2213d84ad960?auto=format&fit=crop&q=80&w=400",
    rating: 4.7,
    color: "#854d0e"
  },
  {
    name: "Modern Tailors",
    category: "Clothing",
    slug: "modern-tailors",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=400",
    rating: 4.6,
    color: "#2563eb"
  },
  {
    name: "Aman Medical Shop",
    category: "Healthcare",
    slug: "aman-medical",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=400",
    rating: 4.9,
    color: "#dc2626"
  },
  {
    name: "Kisan Vegetable Shop",
    category: "Vegetables",
    slug: "kisan-veggies",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
    rating: 4.5,
    color: "#65a30d"
  }
];

const DemoStores = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <SEO
        title="Demo Stores | DigiDukan — See Local Shops Go Digital"
        description="Explore live demo stores of local Indian businesses on DigiDukan. See how kirana shops, bakeries, and small businesses look online in minutes."
        keywords="demo online store india, digidukan demo, kirana store online, local business website demo, digital dukan examples"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "DigiDukan Demo Stores",
          "description": "Live demo stores of local Indian businesses powered by DigiDukan",
          "url": "https://digidukan.com/demo-stores",
          "itemListElement": DEMO_STORES.map((store, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": store.name,
            "url": `https://digidukan.com/store/${store.slug}`
          }))
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 text-gray-900"
          >
            Explore <span className="text-blue-600">Demo</span> Stores
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            See how real local businesses look on DigiDukan. Fast, professional, and ready for orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DEMO_STORES.map((store, i) => (
            <motion.div
              key={store.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-100 group hover:shadow-2xl transition-all"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={store.image} 
                  alt={store.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-gray-900 shadow-sm">
                  {store.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{store.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-gray-500">{store.rating} Rating</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: store.color }}>
                    <Store size={24} />
                  </div>
                </div>
                
                <Link 
                  to={`/store/${store.slug}`}
                  className="w-full mt-6 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                  style={{ backgroundColor: store.color }}
                >
                  <span>Visit Store</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center p-12 bg-gray-900 rounded-[50px] text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to launch your own?</h2>
          <p className="text-gray-400 mb-10 text-lg">Join 50,000+ shopkeepers who have gone digital with DigiDukan.</p>
          <Link to="/register" className="inline-flex items-center space-x-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl">
            <span>Get Started for Free</span>
            <ShoppingBag size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DemoStores;
