import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User, Phone, Store, Zap } from 'lucide-react';

const StoreHero = ({ store }) => {
  return (
    <section 
      className="pt-32 pb-20 px-6 overflow-hidden relative"
      style={{ backgroundColor: store.theme.bg }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/2 mb-12 md:mb-0"
        >
          <div 
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full mb-6 font-bold text-xs uppercase tracking-widest border"
            style={{ borderColor: store.theme.primary, color: store.theme.primary }}
          >
            <MapPin size={14} />
            <span>{store.village}</span>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight"
            style={{ color: store.theme.accent }}
          >
            {store.name}
          </h1>
          
          <p className="text-xl opacity-70 mb-10 font-medium leading-relaxed max-w-xl">
            {store.tagline}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-white shadow-sm text-blue-500">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black opacity-30 tracking-widest">Timings</p>
                <p className="font-bold text-sm" style={{ color: store.theme.accent }}>{store.timing}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-white shadow-sm text-blue-500">
                <User size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black opacity-30 tracking-widest">Owner</p>
                <p className="font-bold text-sm" style={{ color: store.theme.accent }}>{store.owner}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a 
              href={`tel:${store.phone}`}
              className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-2xl flex items-center space-x-3 transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: store.theme.primary }}
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>
            <div 
              className="px-6 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border border-black/5 bg-white/50 backdrop-blur-sm"
              style={{ color: store.theme.accent }}
            >
              ⭐ {store.rating} Rating
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="md:w-1/2 relative"
        >
          <div 
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-[60px] relative overflow-hidden shadow-2xl border-8 border-white group"
          >
             <div 
               className="absolute inset-0 bg-gradient-to-br transition-opacity opacity-20 group-hover:opacity-40"
               style={{ from: store.theme.primary, to: store.theme.secondary }}
             />
             <div className="w-full h-full flex items-center justify-center bg-white/80">
                <Store size={150} className="opacity-10" />
                <div className="absolute text-9xl">{store.products[0].emoji}</div>
             </div>
          </div>
          
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-5 bg-white p-6 rounded-3xl shadow-2xl border border-black/5"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Zap size={20} />
              </div>
              <p className="font-black text-xs uppercase tracking-widest text-gray-900">Fresh Stock</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Circles */}
      <div 
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: store.theme.primary }}
      />
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: store.theme.secondary }}
      />
    </section>
  );
};

export default StoreHero;
