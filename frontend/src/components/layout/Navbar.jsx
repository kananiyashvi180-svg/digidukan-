import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, LogOut, Layout, Home, Smartphone, Settings, BarChart } from 'lucide-react';

const Navbar = () => {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (!isHomePage) {
      navigate('/#' + id);
      return;
    }
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

  const navLinks = [
    { name: 'Features', scroll: 'features' },
    { name: 'How It Works', scroll: 'how-it-works' },
    { name: 'Pricing', scroll: 'pricing' },
    { name: 'Templates', path: '/demo-stores' },
  ];

  const dashboardPath = role === 'HANDLER' ? '/handler/dashboard' : '/dashboard';

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0 group">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">D</div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">DigiDukan</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-bold text-gray-500">
            {navLinks.map((link) => (
              link.scroll ? (
                <button 
                  key={link.name} 
                  onClick={() => scrollToSection(link.scroll)}
                  className="hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </button>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              {user ? (
                <>
                  <Link to={dashboardPath} className="hidden lg:flex items-center space-x-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors mr-4">
                    <Layout size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut size={18} />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
                  <Link to="/register" className="btn-primary !py-2.5 !px-6 !text-sm">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[110] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[300px] bg-white z-[120] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-50">
                <span className="font-bold text-xl">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                <Link to="/" className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 text-gray-900 font-bold group transition-all">
                  <div className="flex items-center space-x-3">
                    <Home size={20} className="text-gray-400 group-hover:text-gray-900" />
                    <span>Home</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </Link>

                {navLinks.map((link) => (
                  <button 
                    key={link.name}
                    onClick={() => link.scroll ? scrollToSection(link.scroll) : navigate(link.path)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 text-gray-900 font-bold group transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      {link.name === 'Features' && <Smartphone size={20} className="text-gray-400 group-hover:text-gray-900" />}
                      {link.name === 'How It Works' && <Settings size={20} className="text-gray-400 group-hover:text-gray-900" />}
                      {link.name === 'Pricing' && <BarChart size={20} className="text-gray-400 group-hover:text-gray-900" />}
                      {link.name === 'Templates' && <Layout size={20} className="text-gray-400 group-hover:text-gray-900" />}
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </button>
                ))}

                <div className="pt-6 border-t border-gray-50 mt-6">
                  {user ? (
                    <>
                      <Link to={dashboardPath} className="flex items-center justify-between p-4 rounded-2xl bg-gray-900 text-white font-bold shadow-lg shadow-gray-200 mb-4">
                        <div className="flex items-center space-x-3">
                          <Layout size={20} />
                          <span>Dashboard</span>
                        </div>
                        <ChevronRight size={16} className="opacity-50" />
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-4 rounded-2xl text-red-600 font-bold hover:bg-red-50 transition-all"
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      <Link to="/login" className="flex items-center justify-center p-4 rounded-2xl border border-gray-200 font-bold text-gray-900 hover:bg-gray-50">
                        Login
                      </Link>
                      <Link to="/register" className="flex items-center justify-center p-4 rounded-2xl bg-gray-900 text-white font-bold shadow-xl shadow-gray-200">
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
