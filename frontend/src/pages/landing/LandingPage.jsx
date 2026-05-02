import SEO from '../../components/common/SEO';
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mic, Globe, Zap, Shield, ChevronRight, PlayCircle, Star, MessageCircle, CheckCircle, Sparkles, Smartphone, BarChart, Users } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="DigiDukan | Apni Dukaan Online Lao" 
        description="Local shopkeepers can create their own online store using voice or text." 
        keywords="digidukan, local shop website, rural ecommerce, kirana website" 
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "DigiDukan",
          "url": "https://digidukan.com",
          "logo": "https://digidukan.com/favicon.ico"
        }} 
      />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-yellow-50/50 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-blue-600 mb-6 sm:mb-8"
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
                className="text-hero mb-6 sm:mb-8"
              >
                Apni Dukaan <span className="text-blue-600">Online</span> Lao
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-10 sm:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Ab bolkar apni website banao. DigiDukan helps rural and small-town shopkeepers go digital in seconds. No coding, just speaking.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-6"
              >
                <Link to="/register" className="btn-primary !text-lg !py-4 !px-10">
                  <span>Create Your Store</span>
                  <ChevronRight size={20} />
                </Link>
                <Link to="/demo-stores" className="btn-secondary !text-lg !py-4 !px-10">
                  <PlayCircle size={20} />
                  <span>See Live Demo</span>
                </Link>
              </motion.div>

              <div className="mt-12 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-gray-400 grayscale opacity-70">
                <span className="font-bold text-lg">Featured in</span>
                <div className="flex gap-8">
                  <div className="font-black text-xl italic">TIMES NOW</div>
                  <div className="font-black text-xl italic">BizzBuzz</div>
                  <div className="font-black text-xl italic">Hindustan</div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 w-full max-w-2xl lg:max-w-none relative"
            >
              <div className="relative aspect-[4/3] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Shopkeeper using DigiDukan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  </div>
                  <p className="text-sm sm:text-base font-bold italic">"Maine 2 minute mein apni dukaan online launch ki!"</p>
                  <p className="text-xs sm:text-sm opacity-80 mt-1">- Rajesh Kumar, Kirana Store Owner</p>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 glass p-4 sm:p-6 rounded-3xl hidden sm:block animate-bounce shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-black">+₹1,240</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">New WhatsApp Order</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-gray-50 border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Live Stores', value: '50k+', icon: Smartphone },
              { label: 'Cities Covered', value: '500+', icon: Globe },
              { label: 'Orders Processed', value: '1M+', icon: BarChart },
              { label: 'Success Rate', value: '99%', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  <stat.icon className="text-blue-600" size={24} />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="text-section-title mb-6">Everything you need to grow</h2>
            <p className="text-gray-500 text-lg">Designed specifically for the unique needs of the local Indian market.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Mic, title: 'Voice Powered', desc: 'Just speak about your shop in Hindi, English, or Hinglish. Our AI handles all the complex website building.', color: 'bg-blue-500' },
              { icon: Zap, title: 'Instant Launch', desc: 'No waiting for developers. Get your professional URL and live store in less than 120 seconds.', color: 'bg-yellow-500' },
              { icon: MessageCircle, title: 'WhatsApp Orders', desc: 'Say goodbye to complex checkouts. Receive customer orders directly on your WhatsApp with list and price.', color: 'bg-green-500' },
              { icon: Globe, title: 'Local SEO', desc: 'Appear at the top of Google searches when local customers look for products near them.', color: 'bg-purple-500' },
              { icon: Shield, title: 'Secure Payments', desc: 'Accept UPI, Credit Cards, and online payments with zero hassle and instant settlements.', color: 'bg-red-500' },
              { icon: Star, title: 'Rural Templates', desc: 'Beautiful, lightning-fast designs tailored for Kirana, Bakery, Electronics, and more.', color: 'bg-orange-500' },
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="card-responsive"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg ${f.color}`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl bg-blue-500 rounded-full" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-section-title mb-6">How it Works</h2>
            <p className="text-gray-400 text-lg">Your online journey starts in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { step: '01', title: 'Register', desc: 'Sign up with your mobile number in seconds.', icon: Smartphone },
              { step: '02', title: 'Speak', desc: 'Describe your shop products in your language.', icon: Mic },
              { step: '03', title: 'Review', desc: 'AI generates your professional store instantly.', icon: Sparkles },
              { step: '04', title: 'Go Live', desc: 'Share your link and get orders on WhatsApp.', icon: Zap },
            ].map((s, i) => (
              <div key={i} className="relative group text-center lg:text-left">
                <div className="hidden lg:block absolute top-10 left-[70%] w-full h-[2px] bg-gradient-to-r from-gray-700 to-transparent last:hidden" />
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 border border-white/10 group-hover:bg-blue-600 transition-colors duration-500">
                  <s.icon size={28} className="text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-4xl font-black text-white/10 mb-2">{s.step}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="text-section-title mb-6">Simple, Honest Pricing</h2>
            <p className="text-gray-500 text-lg">Choose the plan that fits your business needs. No hidden charges.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-gray-50 p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 flex flex-col"
            >
              <div className="mb-8">
                <span className="text-blue-600 bg-blue-100 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Free Forever</span>
                <div className="text-4xl sm:text-5xl font-bold mt-6">₹0<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                <p className="text-gray-500 mt-4 text-sm sm:text-base">Perfect for new shops just starting their digital journey.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['1 Digital Store', 'Up to 20 Products', 'Standard Template', 'WhatsApp Order Link', 'Community Support'].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-600 text-sm">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary w-full">Start Free Trial</Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-gray-900 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col md:scale-105 z-10 border-4 border-blue-600"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles size={120} className="text-white" />
              </div>
              <div className="mb-8 relative z-10">
                <span className="text-yellow-400 bg-yellow-400/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-400/20">Most Popular</span>
                <div className="text-4xl sm:text-5xl font-bold mt-6 text-white">₹99<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                <p className="text-gray-400 mt-4 text-sm sm:text-base">For growing businesses who want a professional edge.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow relative z-10">
                {['Unlimited Products', 'All Rural Templates', 'Custom Store URL', 'Priority WhatsApp Support', 'Inventory Management', 'QR Code for Shop'].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-300 text-sm">
                    <CheckCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary w-full bg-blue-600 hover:bg-blue-700 !shadow-blue-500/20">Get Pro Now</Link>
            </motion.div>

            {/* Business Plan */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-gray-50 p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 flex flex-col"
            >
              <div className="mb-8">
                <span className="text-purple-600 bg-purple-100 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Enterprise</span>
                <div className="text-4xl sm:text-5xl font-bold mt-6">₹299<span className="text-lg text-gray-400 font-medium">/mo</span></div>
                <p className="text-gray-500 mt-4 text-sm sm:text-base">Complete digital solution for established retailers.</p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Up to 5 Stores', 'Custom Domain (.in/.com)', 'Advanced Analytics', 'SMS Notifications', 'Dedicated Account Manager', 'Custom Themes'].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-600 text-sm">
                    <CheckCircle size={18} className="text-purple-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary w-full">Contact Sales</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 container-custom">
        <div className="bg-blue-600 rounded-[2rem] sm:rounded-[4rem] p-8 md:p-16 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Ready to grow your business online?</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-12">Join thousands of shopkeepers who have already launched their digital presence.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/register" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto text-lg py-4 px-10">
                Get Started for Free
              </Link>
              <Link to="/contact" className="btn-secondary bg-blue-700 text-white border-blue-500 hover:bg-blue-800 w-full sm:w-auto text-lg py-4 px-10">
                Talk to Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="col-span-1 lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">D</div>
                <span className="text-2xl font-bold tracking-tight text-gray-900">DigiDukan</span>
              </Link>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                Empowering India's local merchants with the power of AI and simple technology. Launch your store in seconds.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Smartphone size={20} /></a>
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-50 transition-all"><Zap size={20} /></a>
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-green-500 hover:bg-green-50 transition-all"><MessageCircle size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Platform</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection('features')} className="text-gray-500 hover:text-blue-600 transition-colors">Features</button></li>
                <li><Link to="/demo-stores" className="text-gray-500 hover:text-blue-600 transition-colors">Templates</Link></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-gray-500 hover:text-blue-600 transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-gray-500 hover:text-blue-600 transition-colors">How it Works</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-500">
                <li><Link to="/help" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 sm:mt-24 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <p>© 2026 DigiDukan. All rights reserved.</p>
            <div className="flex items-center space-x-2">
              <span>Made with</span>
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span>for Bharat</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
