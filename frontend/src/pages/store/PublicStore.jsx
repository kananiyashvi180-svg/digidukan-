import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageCircle, Phone, MapPin, Share2, Star, ChevronRight, Plus, Store, Clock, Heart } from 'lucide-react';
import SEO from '../../components/common/SEO';

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
      <div className="container-custom">
         <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
           <Store size={48} />
         </div>
         <h1 className="text-3xl sm:text-4xl font-bold mb-4">Shop Not Found</h1>
         <p className="text-gray-500 max-w-sm mx-auto">The digital dukan you are looking for does not exist or has been moved.</p>
         <button onClick={() => window.history.back()} className="btn-primary mt-10">Go Back</button>
      </div>
    </div>
  );

  const structuredData = shop ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": shop.name,
    "telephone": shop.owner?.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": shop.location || "India"
    },
    "openingHours": "Mo-Su 08:00-20:00"
  } : null;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 pb-20 sm:pb-0">
      {shop && (
        <SEO 
          title={`${shop.name} | DigiDukan`}
          description={`Visit ${shop.name} for products, offers and contact details.`}
          image={shop.logo}
          structuredData={structuredData}
        />
      )}

      {/* Hero Header */}
      <header className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 overflow-hidden text-white" style={{ backgroundColor: shop.color || '#111827' }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-[2rem] sm:rounded-[2.5rem] p-2 mb-8 flex items-center justify-center shadow-2xl relative"
            >
              {shop.logo ? (
                <img src={shop.logo} className="w-full h-full object-cover rounded-[1.8rem] sm:rounded-[2.2rem]" alt="" />
              ) : (
                <ShoppingBag size={48} className="text-gray-900" style={{ color: shop.color || '#111827' }} />
              )}
              <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-4 border-white shadow-lg">
                <CheckCircle size={16} className="text-white" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            >
              {shop.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="text-lg sm:text-xl md:text-2xl text-white/80 font-medium mb-10 italic max-w-2xl"
            >
              "{shop.tagline || 'Apni Purani Dukaan, Ab Naye Avatar Mein'}"
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a 
                href={`https://wa.me/${shop.owner?.phone}?text=Hello, I saw your shop ${shop.name} on DigiDukan and I want to order...`} 
                target="_blank" 
                className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
                style={{ color: shop.color || '#111827' }}
              >
                <MessageCircle size={24} />
                <span>Order on WhatsApp</span>
              </a>
              <button className="w-full sm:w-auto px-10 py-5 bg-black/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:bg-black/30 transition-all">
                <Share2 size={24} />
                <span>Share Shop</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Info Bar */}
      <div className="bg-gray-50 border-b border-gray-100 py-4 sm:py-6 overflow-x-auto no-scrollbar">
        <div className="container-custom flex items-center justify-start sm:justify-between gap-8 sm:gap-4 min-w-max sm:min-w-0">
           <div className="flex items-center space-x-3 group cursor-default">
             <div className="p-2 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
               <MapPin size={18} />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</span>
               <span className="text-sm font-bold text-gray-700">Local Pickup</span>
             </div>
           </div>

           <div className="flex items-center space-x-3 group cursor-default">
             <div className="p-2 bg-yellow-100 text-yellow-600 rounded-xl group-hover:bg-yellow-600 group-hover:text-white transition-colors">
               <Star size={18} />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rating</span>
               <span className="text-sm font-bold text-gray-700">4.8 Store Rating</span>
             </div>
           </div>

           <div className="flex items-center space-x-3 group cursor-default">
             <div className="p-2 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
               <Clock size={18} />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Availability</span>
               <span className="text-sm font-bold text-gray-700">{shop.hours || 'Open Now'}</span>
             </div>
           </div>

           <div className="flex items-center space-x-3 group cursor-default">
             <div className="p-2 bg-purple-100 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
               <Phone size={18} />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact</span>
               <span className="text-sm font-bold text-gray-700">Call Now</span>
             </div>
           </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50 flex gap-3">
        <a 
          href={`tel:${shop.owner?.phone}`}
          className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
        >
          <Phone size={24} />
        </a>
        <a 
          href={`https://wa.me/${shop.owner?.phone}?text=I want to order...`}
          className="flex-1 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg"
        >
          <MessageCircle size={24} />
          <span>Quick Order</span>
        </a>
      </div>

      {/* Product Catalog */}
      <main className="py-16 sm:py-24 px-4 container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-12 sm:mb-20 text-center sm:text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Our Catalog</h2>
            <p className="text-gray-500 mt-2 font-medium">Browse our fresh items and latest stock.</p>
          </div>
          <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <button className="px-6 py-2.5 bg-white text-gray-900 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm">All Items</button>
            <button className="px-6 py-2.5 text-gray-400 rounded-xl text-xs font-black uppercase tracking-widest hover:text-gray-600 transition-colors">New Arrivals</button>
          </div>
        </div>

        {shop.products && shop.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {shop.products.map((product, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col h-full"
              >
                <div className="aspect-square bg-gray-50 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden mb-6 relative border border-gray-100 shadow-sm transition-all group-hover:shadow-2xl group-hover:shadow-blue-50 group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <ShoppingBag size={64} className="group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Overlay Button */}
                  <div className="absolute bottom-6 left-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform hidden sm:block">
                    <button 
                      className="w-full py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2 active:scale-95 transition-all"
                      onClick={() => toast.success('Added to WhatsApp bag!')}
                    >
                      <Plus size={20} />
                      <span>Order Item</span>
                    </button>
                  </div>
                  
                  <button className="absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors shadow-lg">
                    <Heart size={20} />
                  </button>
                </div>

                <div className="px-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors truncate">{product.name || product}</h3>
                  <div className="flex items-center space-x-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="text-green-500">In Stock</span>
                    <span>•</span>
                    <span>Direct Order</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-2xl font-black text-gray-900">₹ ???</p>
                    <button className="sm:hidden w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
             <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Package size={40} className="text-gray-200" />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Inventory Syncing</h3>
             <p className="text-gray-500 max-w-xs mx-auto">This shop is currently updating its product catalog. Check back soon!</p>
          </div>
        )}
      </main>

      {/* Premium Store Footer */}
      <footer className="bg-gray-900 py-20 px-6 text-white text-center relative overflow-hidden">
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
         <div className="container-custom relative z-10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-white/5">
              <Store size={32} className="text-white/20" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Bhartiya Dukandar, Digital Raftaar.</h3>
            <p className="text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto text-lg">DigiDukan is proud to support local businesses like <span className="text-white font-bold">{shop.name}</span>. Shop local, shop digital, grow Bharat.</p>
            
            <div className="flex flex-col items-center gap-6">
              <div className="flex justify-center items-center space-x-4 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
                 <div className="w-8 h-px bg-blue-500/20" />
                 <span>Verified by DigiDukan</span>
                 <div className="w-8 h-px bg-blue-500/20" />
              </div>
              <Link to="/" className="text-white/20 hover:text-white transition-colors text-xs font-bold underline underline-offset-4">Create Your Own Store Free</Link>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default PublicStore;
