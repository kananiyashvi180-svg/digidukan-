import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  const scrollToSection = (id) => {
    if (!isHomePage) {
      navigate('/#' + id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', scroll: null },
    { name: 'Features', path: null, scroll: 'features' },
    { name: 'How It Works', path: null, scroll: 'how-it-works' },
    { name: 'Pricing', path: null, scroll: 'pricing' },
    { name: 'Templates', path: '/demo-stores', scroll: null },
  ];

  const dashboardPath = role === 'HANDLER' ? '/handler/dashboard' : '/dashboard';

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#111827' }}>D</div>
          <span className="text-2xl font-display font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>DigiDukan</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-500">
          {navLinks.map((link) => (
            link.scroll ? (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.scroll)}
                className="hover:text-blue-600 transition-colors"
              >
                {link.name}
              </button>
            ) : (
              <Link 
                key={link.name} 
                to={link.path} 
                className="hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
          {user && (
            <Link to={dashboardPath} className="hover:text-blue-600 transition-colors">Dashboard</Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden sm:block text-sm font-medium text-gray-600">
                Hi, {user?.name?.split(' ')[0] || 'User'}
              </span>
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-6 py-2.5 font-bold text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
              <Link to="/register" className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200" style={{ backgroundColor: '#111827' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
