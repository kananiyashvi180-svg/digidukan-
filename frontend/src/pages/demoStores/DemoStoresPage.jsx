import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { demoStores } from '../../data/demoStores';
import SEO from '../../components/common/SEO';
import { 
  Store, Search, Filter, ShoppingBag, ArrowRight, MapPin, 
  Layout, Smartphone, Globe, Layers, CheckCircle 
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
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <SEO 
        title="Explore Demo Stores | DigiDukan Templates"
        description="Browse our collection of fully functional demo websites for local Indian shopkeepers. Find the perfect template for your business."
      />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 relative overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 px-6 py-2 bg-blue-50 text-blue-600 rounded-full mb-8"
          >
            <Layers size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Industry Specific Templates</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black text-gray-900 mb-8 tracking-tighter leading-none">
            Your Vision, <br /> Our <span className="text-blue-600">Templates.</span>
          </h1>
          
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
            Choose from professionally designed demo stores that act as real websites. No coding required, just your shop details.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10">
             {[
               { icon: Smartphone, label: "Mobile First" },
               { icon: Globe, label: "Custom Domain" },
               { icon: CheckCircle, label: "Instant Live" },
             ].map((feat, i) => (
               <div key={i} className="flex items-center space-x-3 text-gray-400">
                  <feat.icon size={20} className="text-blue-500" />
                  <span className="font-bold text-sm tracking-wide">{feat.label}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-30" />
      </section>

      {/* Filter Section */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-2xl border-b border-gray-100 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar max-w-full">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat ? 'bg-white text-blue-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  {cat}
                </button>
              ))}
           </div>

           <div className="relative group w-full md:w-80">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or village..."
                className="pl-16 pr-8 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 w-full transition-all font-bold placeholder:text-gray-300"
              />
           </div>
        </div>
      </div>

      {/* Grid Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((store, i) => (
                <motion.div
                  layout
                  key={store.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <div className="bg-white rounded-[48px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500 flex flex-col h-full">
                    {/* Preview Image */}
                    <div className="h-72 bg-gray-100 relative overflow-hidden flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div 
                        className="w-40 h-40 rounded-[40px] flex items-center justify-center text-7xl transform transition-transform group-hover:scale-125 group-hover:rotate-6"
                        style={{ backgroundColor: store.theme.bg }}
                       >
                          {store.products[0].emoji}
                       </div>
                       
                       <div className="absolute top-6 left-6">
                          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-xl border border-white/20">
                            {store.category}
                          </span>
                       </div>

                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/demo-store/${store.slug}`} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center space-x-3 transform -translate-y-4 group-hover:translate-y-0 transition-all">
                             <span>Live Preview</span>
                             <ArrowRight size={14} />
                          </Link>
                       </div>
                    </div>

                    {/* Content */}
                    <div className="p-10 flex-grow flex flex-col">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{store.name}</h3>
                             <div className="flex items-center space-x-2 text-gray-400 font-bold text-xs">
                                <MapPin size={12} className="text-blue-500" />
                                <span>{store.village}</span>
                             </div>
                          </div>
                          <div className="flex flex-col items-end">
                             <span className="text-amber-500 font-black text-sm">⭐ {store.rating}</span>
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Rating</span>
                          </div>
                       </div>

                       <p className="text-gray-500 font-medium mb-10 line-clamp-2">
                          {store.tagline}
                       </p>

                       <div className="mt-auto flex items-center justify-between">
                          <div className="flex -space-x-2">
                             {store.products.slice(0, 3).map((p, j) => (
                               <div key={j} className="w-10 h-10 bg-gray-50 rounded-full border-4 border-white flex items-center justify-center text-lg shadow-sm">
                                  {p.emoji}
                               </div>
                             ))}
                          </div>
                          <Link to={`/demo-store/${store.slug}`} className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                             <span>View Website</span>
                             <ArrowRight size={14} />
                          </Link>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
          
          {filtered.length === 0 && (
            <div className="py-40 text-center">
               <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                  <ShoppingBag size={48} />
               </div>
               <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">No templates found</h3>
               <p className="text-gray-500 font-medium">Try searching for something else or browse another category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer / Made with DigiDukan */}
      <footer className="py-20 px-8 bg-white border-t border-gray-100 mt-auto text-center">
         <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center space-x-4 bg-gray-50 px-8 py-4 rounded-3xl mb-8 border border-gray-100">
               <Store className="text-blue-500" size={20} />
               <p className="text-sm font-black uppercase tracking-widest text-gray-400">Join 500+ local shops using DigiDukan</p>
            </div>
            <p className="text-gray-300 text-xs font-bold uppercase tracking-widest leading-loose">
               &copy; {new Date().getFullYear()} DigiDukan Technology — Building Digital Villages. <br />
               All demo stores are for showcase purposes only.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default DemoStoresPage;
