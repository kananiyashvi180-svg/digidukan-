import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/api';
import Navbar from '../components/Navbar';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      alert(response.data.message || 'Login successful!');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-[440px] w-full bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px]">
          <h2 className="text-[32px] font-bold text-center mb-8 text-[#0F172A]">Welcome back</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 placeholder:text-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 placeholder:text-gray-400"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-[#5D5CFF] text-white font-bold rounded-2xl hover:bg-[#4B4AEF] transition-all shadow-lg shadow-indigo-200"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-[#64748B] font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#5D5CFF] hover:underline font-bold">
              Create account here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
