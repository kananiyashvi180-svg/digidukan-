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
import { ArrowLeft, Phone, MessageCircle, ShoppingBag, X } from 'lucide-react';

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
      const timer = setTimeout(() => setShowPopup(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [slug, navigate]);

  if (!store) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
        <span className="font-black text-xl uppercase tracking-[0.3em] opacity-20">Opening Shop...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20 sm:pb-0 overflow-x-hidden">
      <SEO 
        title={`${store.name} | DigiDukan Demo`}
        description={store.tagline}
        keywords={`${store.name}, ${store.category}, ${store.village}, buy local`}
      />

      {/* Floating Sticky Actions (Mobile & Tablet) */}
      <div className="fixed bottom-4 sm:bottom-8 left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 z-50 px-4 sm:px-0 flex items-center justify-center gap-3 sm:gap-4">
         <a 
          href={`tel:${store.phone}`}
          className="flex-1 sm:flex-none bg-gray-900 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-2 transform active:scale-95 transition-all"
         >
            <Phone size={18} />
            <span>Call Store</span>
         </a>
         <a 
          href={`https://wa.me/${store.whatsapp}`}
          className="flex-[1.5] sm:flex-none bg-green-600 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-2 transform active:scale-95 transition-all"
         >
            <MessageCircle size={18} />
            <span>WhatsApp Order</span>
         </a>
      </div>

      {/* Navigation Layer */}
      <div className="fixed top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 z-50 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate('/demo-stores')}
          className="pointer-events-auto p-3 sm:p-4 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-black/5 shadow-xl hover:scale-110 active:scale-95 transition-all text-gray-900 group"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <span className="font-black text-[10px] uppercase tracking-widest hidden sm:inline">All Templates</span>
          </div>
        </button>

        <div className="pointer-events-auto bg-amber-100/90 backdrop-blur-md border border-amber-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 sm:gap-3 shadow-lg">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-ping" />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-800">Demo Preview</span>
        </div>
      </div>

      <StoreHero store={store} />
      
      {/* Today's Deal Ticker */}
      <div className="bg-gray-900 text-white py-3 sm:py-4 overflow-hidden relative border-y border-white/5">
         <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 mx-6 sm:mx-8">
                 <ShoppingBag size={14} className="text-blue-500" />
                 <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">Today's Special: {store.products[0].name} @ {store.products[0].price} Only!</span>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 max-w-lg w-full relative overflow-hidden shadow-2xl"
            >
               <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-xl transition-colors"
               >
                 <X size={20} />
               </button>
               
               <div className="text-center">
                  <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-bounce">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Festival Dhamaka!</h3>
                  <p className="text-gray-500 font-medium text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
                    Get extra <span className="text-orange-600 font-black">20% OFF</span> on all bulk orders. Pure quality, best price!
                  </p>
                  
                  <button 
                    onClick={() => setShowPopup(false)}
                    className="btn-primary w-full !bg-orange-600 hover:!bg-orange-700 !py-5 !text-xs !uppercase !tracking-widest !shadow-orange-200"
                  >
                    View All Offers
                  </button>
               </div>

               <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-100/50 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreDetailsPage;
