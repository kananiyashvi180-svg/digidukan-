import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

const OfferSection = ({ store }) => {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied!`);
  };

  return (
    <section className="py-24 px-6" style={{ backgroundColor: store.theme.bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex p-4 rounded-3xl bg-white shadow-sm text-amber-500 mb-6">
            <Sparkles size={32} />
          </div>
          <h2 
            className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tighter"
            style={{ color: store.theme.accent }}
          >
            Special Offers & Deals
          </h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">Save big with our exclusive local offers and festival discounts!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {store.offers.map((offer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between border-4 border-dashed relative overflow-hidden"
              style={{ borderColor: store.theme.primary + '40' }}
            >
              <div className="flex items-center space-x-6 mb-8 md:mb-0">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: store.theme.primary }}
                >
                  <Gift size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">{offer.title}</h3>
                  <p className="text-gray-500 font-medium">{offer.desc}</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-2">Use Code</div>
                 <button 
                  onClick={() => copyCode(offer.code)}
                  className="px-8 py-4 rounded-2xl border-2 border-gray-100 flex items-center space-x-3 group hover:border-blue-500 transition-all"
                 >
                    <span className="font-display font-black text-xl tracking-widest">{offer.code}</span>
                    <Copy size={16} className="text-gray-300 group-hover:text-blue-500" />
                 </button>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-gray-50 rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gray-50 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Festival Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 rounded-[40px] bg-gradient-to-r from-orange-500 to-red-600 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden group"
        >
           <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-3xl font-black mb-2 flex items-center justify-center md:justify-start space-x-3">
                 <Sparkles />
                 <span>Upcoming Festival Sale!</span>
              </h3>
              <p className="opacity-90 font-bold">Extra 20% Discount on all orders between 15th-20th May.</p>
           </div>
           <button className="relative z-10 px-10 py-5 bg-white text-orange-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transform transition-transform group-hover:scale-110 active:scale-95">
              Remind Me
           </button>

           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-16 -mb-16" />
        </motion.div>
      </div>
    </section>
  );
};

export default OfferSection;
