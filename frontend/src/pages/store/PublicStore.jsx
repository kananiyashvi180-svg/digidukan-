import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageCircle, Phone, MapPin, Share2, Star, ChevronRight, Plus, Store } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/v1`;

const PublicStore = () => {
  const { slug } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`${API_URL}/shops/${slug}`);
        setShop(response.data.data.shop);
      } catch (error) {

        console.error('Error fetching shop', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!shop) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center p-6">
      <div>
         <h1 className="text-4xl font-bold mb-4">Shop Not Found</h1>
         <p className="text-gray-500">The digital dukan you are looking for does not exist.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      {/* Dynamic Header based on Template Color */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ backgroundColor: shop.color || '#111827' }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto text-center text-white relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-32 h-32 bg-white rounded-[40px] mx-auto mb-8 flex items-center justify-center shadow-2xl">
            {shop.logo ? (
              <img src={shop.logo} className="w-full h-full object-cover rounded-[40px]" alt="" />
            ) : (
              <ShoppingBag size={48} className="text-gray-900" style={{ color: shop.color || '#111827' }} />
            )}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-display font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {shop.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl md:text-2xl text-white/80 font-medium mb-10 italic">
            "{shop.tagline || 'Apni Purani Dukaan, Ab Naye Avatar Mein'}"
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href={`https://wa.me/${shop.owner?.phone}?text=Hello, I saw your shop ${shop.name} on DigiDukan and I want to order...`} 
              target="_blank" 
              className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg flex items-center space-x-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
              style={{ color: shop.color || '#111827' }}
            >
              <MessageCircle size={24} />
              <span>Order on WhatsApp</span>
            </a>
            <button className="px-10 py-5 bg-black/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg flex items-center space-x-3 hover:bg-black/30 transition-all">
              <Share2 size={24} />
              <span>Share Shop</span>
            </button>
          </div>
        </div>
      </header>

      {/* Info Bar */}
      <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-gray-500 font-bold text-sm uppercase tracking-widest">
           <div className="flex items-center space-x-2"><MapPin size={18} className="text-blue-500" /> <span>Local Pickup Available</span></div>
           <div className="flex items-center space-x-2"><Star size={18} className="text-yellow-500" /> <span>4.8 Store Rating</span></div>
           <div className="flex items-center space-x-2"><Phone size={18} className="text-green-500" /> <span>Call Store: {shop.owner?.phone || 'Contact Support'}</span></div>
        </div>
      </div>

      {/* Product Catalog */}
      <main className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-display font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Product Catalog</h2>
            <p className="text-gray-500 mt-2">Browse our fresh items and latest stock.</p>
          </div>
          <div className="flex space-x-2">
            <span className="px-6 py-2 bg-gray-100 rounded-full text-xs font-black uppercase tracking-widest text-gray-500">All Items</span>
            <span className="px-6 py-2 bg-white border border-gray-100 rounded-full text-xs font-black uppercase tracking-widest text-gray-300">New Arrivals</span>
          </div>
        </div>

        {shop.products && shop.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {shop.products.map((product, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-gray-50 rounded-[40px] overflow-hidden mb-6 relative border border-gray-100 shadow-sm transition-all group-hover:shadow-2xl group-hover:shadow-blue-100 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <ShoppingBag size={64} />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform">
                    <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2">
                      <Plus size={20} />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{product.name || product}</h3>
                <p className="text-gray-500 font-medium">Fresh Stock Available</p>
                <p className="mt-2 text-2xl font-black text-gray-900">₹ ??? <span className="text-sm font-bold text-gray-400">/ unit</span></p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
             <Store size={64} className="mx-auto mb-6 opacity-20" />
             <p className="text-xl font-medium">Products coming soon!</p>
          </div>
        )}
      </main>

      {/* Footer / Store Info */}
      <footer className="bg-gray-900 py-20 px-6 text-white text-center">
         <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-display font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>Bhartiya Dukandar, Digital Raftaar.</h3>
            <p className="text-gray-400 mb-10 leading-relaxed">DigiDukan is proud to support local businesses like {shop.name}. Shop local, shop digital.</p>
            <div className="flex justify-center items-center space-x-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-500">
               <div className="w-10 h-px bg-blue-500/30" />
               <span>Powered by DigiDukan</span>
               <div className="w-10 h-px bg-blue-500/30" />
            </div>
         </div>
      </footer>
    </div>
  );
};

export default PublicStore;
