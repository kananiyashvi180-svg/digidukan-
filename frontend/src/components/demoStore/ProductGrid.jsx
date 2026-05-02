import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';

const ProductGrid = ({ store }) => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 
              className="text-4xl font-display font-black mb-4 tracking-tighter"
              style={{ color: store.theme.accent }}
            >
              Popular Products
            </h2>
            <p className="text-gray-400 font-medium max-w-md">Our best-selling items, handpicked for quality and freshness.</p>
          </div>
          <div className="hidden md:block">
             <div className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400">
               Total 6 Items
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {store.products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 rounded-[40px] p-8 group relative overflow-hidden transition-all hover:shadow-2xl hover:bg-white border border-transparent hover:border-gray-100"
            >
              <div className="text-7xl mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                {product.emoji}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
              <p className="text-2xl font-black mb-8" style={{ color: store.theme.primary }}>{product.price}</p>
              
              <button 
                className="w-full py-4 rounded-2xl bg-white border-2 flex items-center justify-center space-x-3 text-xs font-black uppercase tracking-widest transition-all group-hover:text-white"
                style={{ borderColor: store.theme.primary, color: store.theme.primary }}
                onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = store.theme.primary;
                   e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = 'white';
                   e.currentTarget.style.color = store.theme.primary;
                }}
              >
                <Plus size={16} />
                <span>Add to List</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
