import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { demoStores } from '../../data/demoStores';
import SEO from '../../components/common/SEO';
import { 
  Store, Search, Filter, ShoppingBag, ArrowRight, MapPin, 
  Layout, Smartphone, Globe, Layers, CheckCircle, ChevronRight
} from 'lucide-react';

const DemoStoresPage = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...new Set(demoStores.map(s => s.category))];

  const filtered = demoStores.filter(s => 
    (filter === 'All' || s.category === filter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.village.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <SEO 
        title="Explore Demo Stores | DigiDukan Templates"
        description="Browse our collection of fully functional demo websites for local Indian shopkeepers. Find the perfect template for your business."
      />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 bg-white border-b border-gray-100 overflow-hidden relative">
        <div className="container-custom relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 sm:px-6 sm:py-2 bg-blue-50 text-blue-600 rounded-full mb-6 sm:mb-8"
          >
            <Layers size={14} className="sm:size-4" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Industry Specific Templates</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 sm:mb-8 tracking-tighter leading-none">
            Your Vision, <br className="hidden sm:block" /> Our <span className="text-blue-600">Templates.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 sm:mb-16 leading-relaxed px-4">
            Choose from professionally designed demo stores that act as real websites. No coding required, just your shop details.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
             {[
               { icon: Smartphone, label: "Mobile First" },
               { icon: Globe, label: "Custom Domain" },
               { icon: CheckCircle, label: "Instant Live" },
             ].map((feat, i) => (
               <div key={i} className="flex items-center space-x-2 text-gray-400">
                  <feat.icon size={18} className="text-blue-500" />
                  <span className="font-bold text-xs sm:text-sm tracking-wide">{feat.label}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-30" />
      </section>

      {/* Filter Bar (Sticky) */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4 sm:py-6">
        <div className="container-custom flex flex-col lg:flex-row justify-between items-center gap-6">
           <div className="w-full lg:w-auto overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
             <div className="flex items-center space-x-2 min-w-max">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === cat ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' : 'bg-gray-50 text-gray-400 hover:text-gray-900 border border-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
           </div>

           <div className="relative group w-full lg:w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shops or locations..."
                className="pl-14 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 w-full transition-all font-bold placeholder:text-gray-300 text-sm"
              />
           </div>
        </div>
      </div>

      {/* Templates Grid */}
      <section className="py-12 sm:py-24 container-custom">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {filtered.map((store, i) => (
              <motion.div
                layout
                key={store.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group h-full flex flex-col"
              >
                <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-blue-500/10 transition-all duration-500 flex flex-col h-full">
                  {/* Visual Preview */}
                  <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center group-hover:bg-blue-50/30 transition-colors">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div 
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] sm:rounded-[3rem] flex items-center justify-center text-6xl sm:text-7xl transform transition-all group-hover:scale-125 group-hover:rotate-6 shadow-sm"
                      style={{ backgroundColor: store.theme.bg }}
                     >
                        {store.products[0].emoji}
                     </div>
                     
                     <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-gray-900 shadow-xl border border-white/20">
                          {store.category}
                        </span>
                     </div>

                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Link to={`/demo-store/${store.slug}`} className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-3 transform -translate-y-4 group-hover:translate-y-0 transition-all">
                           <span>Live Preview</span>
                           <ArrowRight size={14} />
                        </Link>
                     </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-8 sm:p-10 flex-grow flex flex-col">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{store.name}</h3>
                           <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                              <MapPin size={12} className="text-blue-500" />
                              <span>{store.village}</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-amber-500 font-black text-sm">⭐ {store.rating}</div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">Rating</span>
                        </div>
                     </div>

                     <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed line-clamp-2">
                        {store.tagline}
                     </p>

                     <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex -space-x-2">
                           {store.products.slice(0, 3).map((p, j) => (
                             <div key={j} className="w-10 h-10 bg-gray-50 rounded-full border-4 border-white flex items-center justify-center text-lg shadow-sm">
                                {p.emoji}
                             </div>
                           ))}
                        </div>
                        <Link to={`/demo-store/${store.slug}`} className="text-blue-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                           <span>Explore</span>
                           <ChevronRight size={14} />
                        </Link>
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
        
        {filtered.length === 0 && (
          <div className="py-32 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                <ShoppingBag size={40} />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">No templates found</h3>
             <p className="text-gray-500 max-w-xs mx-auto">Try searching for something else or browse another category.</p>
          </div>
        )}
      </section>

      {/* Global Footer */}
      <footer className="py-16 sm:py-24 bg-white border-t border-gray-100 text-center">
         <div className="container-custom">
            <div className="inline-flex items-center gap-4 bg-gray-50 px-6 py-3 sm:px-8 sm:py-4 rounded-[2rem] mb-10 border border-gray-100 shadow-sm">
               <Store className="text-blue-500" size={20} />
               <p className="text-xs font-black uppercase tracking-widest text-gray-400">Join 500+ local shops using DigiDukan</p>
            </div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] leading-loose max-w-xl mx-auto">
               &copy; {new Date().getFullYear()} DigiDukan Technology — Building Digital Villages. <br className="hidden sm:block" />
               All demo stores are for showcase purposes only.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default DemoStoresPage;
