import SEO from '../../components/common/SEO';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      if (user.role === 'HANDLER') {
        navigate('/handler/dashboard');
      } else {
        navigate('/dashboard');
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '16px',
    border: '2px solid #f3f4f6',
    backgroundColor: '#f9fafb',
    outline: 'none',
    fontSize: '16px',
    marginBottom: '20px'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6" style={{ backgroundColor: '#f9fafb' }}>
      <SEO
        title="Login | DigiDukan — Apni Dukaan Online Lao"
        description="Login to your DigiDukan account to manage your digital shop, products, and customer orders from one easy dashboard."
        keywords="digidukan login, shopkeeper login, digital dukan, manage online store"
        noIndex={true}
      />

      <div className="max-w-md w-full p-10 rounded-[32px] bg-white shadow-2xl shadow-gray-200 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to manage your digital dukan</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={onChange}
              style={inputStyle}
              placeholder="ravi@example.com" 
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={onChange}
              style={inputStyle}
              placeholder="••••••••" 
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all"
            style={{ backgroundColor: '#111827' }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-8 text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
