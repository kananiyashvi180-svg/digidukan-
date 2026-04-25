import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../services/api';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await signup(formData);
      alert(response.data.message || 'Signup successful!');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="max-w-[440px] w-full bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px]">
          <div className="text-center mb-8">
            <h2 className="text-[32px] font-bold text-[#0F172A] mb-2">Create your account</h2>
            <p className="text-[#64748B] font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#5D5CFF] hover:underline font-bold">
                Sign in
              </Link>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 placeholder:text-gray-400"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 placeholder:text-gray-400"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 placeholder:text-gray-400"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 placeholder:text-gray-400"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <button
              type="submit"
              className="w-full py-4 mt-4 bg-[#5D5CFF] text-white font-bold rounded-2xl hover:bg-[#4B4AEF] transition-all shadow-lg shadow-indigo-200"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
