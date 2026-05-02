import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Award } from 'lucide-react';

const OwnerSection = ({ store }) => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:w-1/2"
        >
          <div className="relative">
            <div className="w-full h-[500px] bg-gray-100 rounded-[60px] overflow-hidden shadow-2xl relative border-8 border-white">
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-10">
                  <div className="text-white">
                    <p className="text-sm font-black uppercase tracking-widest opacity-70 mb-2">Proud Owner</p>
                    <h3 className="text-4xl font-display font-black tracking-tight">{store.owner}</h3>
                  </div>
               </div>
               <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <div className="text-9xl opacity-20">👨🏽‍💼</div>
               </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 max-w-[300px]">
               <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6"
                style={{ backgroundColor: store.theme.primary }}
               >
                  <Heart size={24} />
               </div>
               <p className="font-bold text-gray-900 mb-2">Building Community</p>
               <p className="text-sm text-gray-500 leading-relaxed font-medium">Serving {store.village} with honest pricing and pure products since 15 years.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:w-1/2"
        >
          <h2 
            className="text-4xl md:text-5xl font-display font-black mb-8 leading-tight tracking-tighter"
            style={{ color: store.theme.accent }}
          >
            Meet the Person Behind {store.name}
          </h2>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed font-medium italic">
            "Mera maksad sirf vyapaar nahi, balki apne gaon ke har ghar tak sahi aur swasth saamaan pahuchana hai. Aapka bharosa hi meri asli kamai hai."
          </p>

          <div className="space-y-6">
             {[
               { icon: ShieldCheck, title: "Quality Guarantee", desc: "Every item is checked for purity and freshness before selling." },
               { icon: Award, title: "Fair Pricing", desc: "No extra charges. Mandi rates applied directly to save you money." },
             ].map((item, i) => (
               <div key={i} className="flex items-start space-x-6 p-6 rounded-3xl hover:bg-gray-50 transition-colors">
                  <div 
                    className="p-4 rounded-2xl bg-white shadow-md text-blue-500"
                    style={{ color: store.theme.primary }}
                  >
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OwnerSection;
