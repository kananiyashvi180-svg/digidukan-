import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { demoStores } from '../../data/demoStores';
import StoreHero from '../../components/demoStore/StoreHero';
import ProductGrid from '../../components/demoStore/ProductGrid';
import OfferSection from '../../components/demoStore/OfferSection';
import OwnerSection from '../../components/demoStore/OwnerSection';
import ReviewSection from '../../components/demoStore/ReviewSection';
import ContactSection from '../../components/demoStore/ContactSection';
import Footer from '../../components/demoStore/Footer';
import SEO from '../../components/common/SEO';
import { ArrowLeft, Phone, MessageCircle, ShoppingBag } from 'lucide-react';

const StoreDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const foundStore = demoStores.find(s => s.slug === slug);
    if (!foundStore) {
      navigate('/demo-stores');
    } else {
      setStore(foundStore);
      // Show festival popup after 3 seconds
      const timer = setTimeout(() => setShowPopup(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [slug, navigate]);

  if (!store) return <div className="min-h-screen flex items-center justify-center font-black text-2xl uppercase tracking-[0.3em] opacity-20">Opening Shop...</div>;

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${store.name} | DigiDukan Demo`}
        description={store.tagline}
        keywords={`${store.name}, ${store.category}, ${store.village}, buy local`}
      />

      {/* Floating Sticky Actions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4">
         <a 
          href={`tel:${store.phone}`}
          className="bg-blue-600 text-white px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center space-x-3 transform active:scale-95 transition-transform"
         >
            <Phone size={18} />
            <span className="hidden md:inline">Call Now</span>
         </a>
         <a 
          href={`https://wa.me/${store.whatsapp}`}
          className="bg-emerald-500 text-white px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center space-x-3 transform active:scale-95 transition-transform"
         >
            <MessageCircle size={18} />
            <span className="hidden md:inline">WhatsApp Order</span>
         </a>
      </div>

      {/* Back to Demo Stores Button */}
      <button 
        onClick={() => navigate('/demo-stores')}
        className="fixed top-8 left-8 z-50 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-black/5 shadow-xl hover:scale-110 active:scale-95 transition-all text-gray-900 group"
      >
        <div className="flex items-center space-x-3">
          <ArrowLeft size={20} />
          <span className="font-black text-[10px] uppercase tracking-widest hidden group-hover:inline">Back to Templates</span>
        </div>
      </button>

      {/* Voice Order Badge */}
      <div className="fixed top-8 right-8 z-50">
         <div className="bg-amber-100 border border-amber-200 px-4 py-2 rounded-xl flex items-center space-x-3 shadow-lg">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">Voice Order Coming Soon</span>
         </div>
      </div>

      <StoreHero store={store} />
      
      {/* Today's Deal Ticker */}
      <div className="bg-gray-900 text-white py-4 overflow-hidden relative border-y border-white/5">
         <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 mx-8">
                 <ShoppingBag size={16} className="text-blue-500" />
                 <span className="font-black text-[10px] uppercase tracking-[0.2em]">Today's Special: {store.products[0].name} @ {store.products[0].price} Only!</span>
              </div>
            ))}
         </div>
      </div>

      <ProductGrid store={store} />
      <OfferSection store={store} />
      <OwnerSection store={store} />
      <ReviewSection store={store} />
      <ContactSection store={store} />
      <Footer store={store} />

      {/* Festival Offer Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[60px] p-12 max-w-lg w-full relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
               <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-colors"
               >
                 <ArrowLeft size={24} className="rotate-90" />
               </button>
               
               <div className="text-center">
                  <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-[40px] flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <ShoppingBag size={48} />
                  </div>
                  <h3 className="text-4xl font-display font-black text-gray-900 mb-4 tracking-tighter">Festival Dhamaka!</h3>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10">
                    Get extra <span className="text-orange-600 font-black">20% OFF</span> on all bulk orders this festive season. Pure quality, best price!
                  </p>
                  
                  <button 
                    onClick={() => setShowPopup(false)}
                    className="w-full py-6 bg-orange-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition-transform"
                  >
                    Loot Lo Offers!
                  </button>
               </div>

               <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreDetailsPage;
