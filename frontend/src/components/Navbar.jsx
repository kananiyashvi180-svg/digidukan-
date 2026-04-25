import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
        <span className="text-xl font-bold text-gray-900">DigiDukan</span>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
        <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
