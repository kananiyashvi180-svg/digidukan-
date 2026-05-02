import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ThumbsUp } from 'lucide-react';

const ReviewSection = ({ store }) => {
  const reviews = [
    { name: "Suresh Sharma", role: "Farmer", text: "Ram Kirana hamesha sahi daam lagate hain. Inke chawal ki quality sabse achi hai.", rating: 5 },
    { name: "Priya Patel", role: "Teacher", text: "Service bahut tez hai. WhatsApp par message karte hi saamaan ghar aa jata hai.", rating: 4 },
    { name: "Amit Singh", role: "Shopkeeper", text: "Pichle 5 saal se yahan se hi sauda le rahe hain. Vishwas ka naam hai.", rating: 5 },
  ];

  return (
    <section 
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: store.theme.bg }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 
              className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tighter"
              style={{ color: store.theme.accent }}
            >
              What Our Neighbors Say
            </h2>
            <p className="text-gray-500 font-medium max-w-md">Real stories and feedback from the people of {store.village}.</p>
          </div>
          <div className="flex items-center space-x-4 bg-white px-8 py-5 rounded-[24px] shadow-sm">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden flex items-center justify-center font-black text-xs text-gray-400">
                    U{i}
                  </div>
                ))}
             </div>
             <div>
                <p className="font-black text-xl leading-none">4.9/5</p>
                <p className="text-[10px] uppercase font-black opacity-30 tracking-widest mt-1">Global Rating</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[48px] shadow-sm relative border border-black/5 flex flex-col h-full group hover:shadow-2xl hover:bg-white transition-all duration-500"
            >
              <div className="flex text-amber-500 mb-8 space-x-1">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              
              <Quote className="text-blue-500/10 absolute top-10 right-10" size={64} />
              
              <p className="text-lg text-gray-700 font-medium leading-relaxed mb-10 flex-grow">
                "{review.text}"
              </p>

              <div className="flex items-center space-x-4 pt-8 border-t border-gray-50">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-blue-500 shadow-inner">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
