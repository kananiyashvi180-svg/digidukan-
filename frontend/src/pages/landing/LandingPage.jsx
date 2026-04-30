import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mic, Globe, Zap, Shield, ChevronRight, PlayCircle, Star, MessageCircle, CheckCircle, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-yellow-100/50 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-bold text-gray-600 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Trusted by 50,000+ local businesses</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1] text-gray-900"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Apni Dukaan <span className="text-blue-600" style={{ color: '#3b82f6' }}>Online</span> Lao
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Ab bolkar apni website banao. DigiDukan helps rural and small-town shopkeepers go digital in seconds. No coding, just speaking.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/register" className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 shadow-2xl hover:scale-105 active:scale-95 transition-all" style={{ backgroundColor: '#111827' }}>
              <span>Create Your Store</span>
              <ChevronRight size={20} />
            </Link>
            <Link to="/demo-stores" className="w-full sm:w-auto px-10 py-5 border-2 border-gray-200 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all text-gray-900 bg-white">
              <PlayCircle size={20} />
              <span>See Live Demo</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Everything you need to grow</h2>
            <p className="text-gray-500 text-lg">Designed for the local Indian market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mic, title: 'Voice Powered', desc: 'Just speak about your shop in Hindi or Hinglish. AI handles the rest.', color: '#3b82f6' },
              { icon: Zap, title: 'Instant Launch', desc: 'Get your professional URL in less than 2 minutes.', color: '#fbbf24' },
              { icon: MessageCircle, title: 'WhatsApp Orders', desc: 'Receive customer orders directly on your WhatsApp.', color: '#10b981' },
              { icon: Globe, title: 'Local SEO', desc: 'Appear in Google searches when locals look for your products.', color: '#8b5cf6' },
              { icon: Shield, title: 'Secure Payments', desc: 'Accept UPI and online payments with zero hassle.', color: '#ef4444' },
              { icon: Star, title: 'Rural Templates', desc: 'Beautiful designs tailored for Kirana, Bakery, and more.', color: '#f59e0b' },
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg" style={{ backgroundColor: f.color }}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-gray-900">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Register', desc: 'Sign up with your mobile number.' },
              { step: '02', title: 'Speak', desc: 'Describe your shop in your language.' },
              { step: '03', title: 'Review', desc: 'AI generates your store instantly.' },
              { step: '04', title: 'Go Live', desc: 'Start receiving orders on WhatsApp.' },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black text-gray-50 mb-4 absolute -top-8 left-1/2 -translate-x-1/2 -z-10">{s.step}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Simple, Honest Pricing</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Choose the plan that fits your business needs. No hidden charges.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="mb-8">
                <span className="text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Free Forever</span>
                <div className="text-5xl font-bold mt-6 text-gray-900">₹0<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                <p className="text-gray-500 mt-4 font-medium">Perfect for new shops just starting their journey.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['1 Digital Store', 'Up to 20 Products', 'Standard Template', 'WhatsApp Order Link', 'Community Support'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-600 font-medium text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <CheckCircle size={12} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full py-5 bg-gray-100 text-gray-900 text-center rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all">Start Free Trial</Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-gray-900 p-10 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col transform md:scale-110 z-10"
              style={{ backgroundColor: '#111827' }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles size={120} className="text-white" />
              </div>
              <div className="mb-8 relative z-10">
                <span className="text-yellow-400 bg-yellow-400/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-400/20">Most Popular</span>
                <div className="text-5xl font-bold mt-6 text-white">₹99<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                <p className="text-gray-400 mt-4 font-medium">For growing businesses who want a professional edge.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow relative z-10">
                {['Unlimited Products', 'All Rural Templates', 'Custom Store URL', 'Priority WhatsApp Support', 'Inventory Management', 'QR Code for Shop'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-100 font-medium text-sm">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <CheckCircle size={12} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full py-5 bg-blue-600 text-white text-center rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 relative z-10">Get Pro Now</Link>
            </motion.div>

            {/* Business Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="mb-8">
                <span className="text-purple-600 bg-purple-50 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Enterprise</span>
                <div className="text-5xl font-bold mt-6 text-gray-900">₹299<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                <p className="text-gray-500 mt-4 font-medium">Complete digital solution for established retailers.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Up to 5 Stores', 'Custom Domain (.in/.com)', 'Advanced Analytics', 'SMS Notifications', 'Dedicated Account Manager', 'Custom Themes'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-600 font-medium text-sm">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <CheckCircle size={12} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full py-5 bg-gray-100 text-gray-900 text-center rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all">Contact Sales</Link>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-900">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold">D</div>
              <span className="text-xl font-display font-bold text-gray-900">DigiDukan</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8">Empowering India's local merchants with the power of AI and simple technology.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors">Features</button></li>
              <li><Link to="/templates" className="hover:text-blue-600 transition-colors">Templates</Link></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-blue-600 transition-colors">Pricing</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-medium">
          <p>© 2026 DigiDukan. All rights reserved.</p>
          <p>Made with ❤️ for Bharat</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
