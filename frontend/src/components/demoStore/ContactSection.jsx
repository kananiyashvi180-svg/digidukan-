import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Send, MessageSquare } from 'lucide-react';

const ContactSection = ({ store }) => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:w-1/2"
        >
          <h2 
            className="text-4xl md:text-6xl font-display font-black mb-8 leading-tight tracking-tighter"
            style={{ color: store.theme.accent }}
          >
            Aapki Har Zaroorat, <br /> Ek Phone Dur!
          </h2>
          <p className="text-xl text-gray-500 mb-12 font-medium max-w-lg leading-relaxed">
            Order by phone, ask for prices, or just send us a WhatsApp. We are here to help our community.
          </p>

          <div className="space-y-4">
             {[
               { icon: Phone, label: "Direct Call", value: store.phone, color: "bg-blue-500" },
               { icon: MessageCircle, label: "WhatsApp Order", value: "Chat with us", color: "bg-green-500" },
               { icon: MapPin, label: "Shop Location", value: store.village, color: "bg-orange-500" },
             ].map((item, i) => (
               <div key={i} className="flex items-center space-x-6 p-6 rounded-3xl border border-gray-100 hover:border-blue-500/20 hover:bg-gray-50 transition-all group">
                  <div className={`p-4 rounded-2xl ${item.color} text-white shadow-lg shadow-blue-500/10`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-gray-900">{item.value}</p>
                  </div>
               </div>
             ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 bg-gray-50 p-12 rounded-[60px] border border-gray-100 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-10 text-gray-900">Send a Message</h3>
            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input placeholder="Your Name" className="bg-white border-none rounded-2xl p-5 w-full outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-bold placeholder:text-gray-300" />
                  <input placeholder="Your Phone" className="bg-white border-none rounded-2xl p-5 w-full outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-bold placeholder:text-gray-300" />
               </div>
               <textarea rows="4" placeholder="How can we help you today?" className="bg-white border-none rounded-3xl p-6 w-full outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-bold placeholder:text-gray-300"></textarea>
               
               <button 
                className="w-full py-5 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center space-x-3 transform transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: store.theme.primary }}
               >
                 <Send size={18} />
                 <span>Send message</span>
               </button>
            </form>

            <div className="mt-12 flex items-center justify-center space-x-4 p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50">
               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <MessageSquare size={18} />
               </div>
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Typical reply time: 5 minutes</p>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
