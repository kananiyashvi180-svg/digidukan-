import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, ShieldCheck } from 'lucide-react';

const Footer = ({ store }) => {
  return (
    <footer 
      className="py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: store.theme.accent }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-display font-black text-white mb-6">{store.name}</h2>
            <p className="text-white/50 text-lg font-medium leading-relaxed max-w-md">
              Bringing the best of {store.village} to your fingertips. Digital dukan, vishwas purana.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8">Navigation</h4>
            <ul className="space-y-4 text-white/70 font-bold">
              <li className="hover:text-white transition-colors cursor-pointer">Home</li>
              <li className="hover:text-white transition-colors cursor-pointer">Products</li>
              <li className="hover:text-white transition-colors cursor-pointer">Offers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8">Trust</h4>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Verified Local Shop</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-400">
                <Heart size={20} />
              </div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Village's Favorite</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center space-x-4">
              <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40">
                 Made with DigiDukan
              </div>
              <div className="w-8 h-px bg-white/10" />
              <div className="flex items-center space-x-2 text-white/20 text-xs font-bold uppercase tracking-widest">
                 <Globe size={14} />
                 <span>Digital Village Initiative</span>
              </div>
           </div>
           
           <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
             &copy; {new Date().getFullYear()} {store.name} — ALL RIGHTS RESERVED.
           </p>
        </div>
      </div>

      {/* Decorative */}
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 blur-3xl opacity-20 -mr-48 -mb-48 rounded-full"
        style={{ backgroundColor: store.theme.primary }}
      />
    </footer>
  );
};

export default Footer;
