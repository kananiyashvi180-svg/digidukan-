import SEO from '../../components/common/SEO';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'SHOPKEEPER',
    phone: ''
  });
  const { name, email, password, role, phone } = formData;

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
      if (user?.role === 'HANDLER') {
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
    dispatch(register(formData));
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '16px',
    border: '2px solid #f3f4f6',
    backgroundColor: '#f9fafb',
    outline: 'none',
    fontSize: '16px',
    marginBottom: '15px'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12" style={{ backgroundColor: '#f9fafb' }}>
      <SEO
        title="Create Account | DigiDukan — Start Your Online Store for Free"
        description="Join 50,000+ local shopkeepers on DigiDukan. Sign up for free and create your professional online store in minutes — no coding, just speaking."
        keywords="digidukan register, create online store india, free kirana website, start digital dukan, local shop signup"
        noIndex={true}
      />

      <div className="max-w-md w-full p-10 rounded-[32px] bg-white shadow-2xl shadow-gray-200 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Create Account</h2>
          <p className="text-gray-500 mt-2">Join DigiDukan and go digital today</p>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={name}
              onChange={onChange}
              style={inputStyle}
              placeholder="Yashvi Kanani" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={onChange}
              style={inputStyle}
              placeholder="yashvi@example.com" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Password</label>
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
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={phone}
              onChange={onChange}
              style={inputStyle}
              placeholder="9106454707" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">I am a...</label>
            <select 
              name="role"
              value={role}
              onChange={onChange}
              style={inputStyle}
              className="appearance-none"
            >
              <option value="SHOPKEEPER">Shopkeeper (Dukandar)</option>
              <option value="HANDLER">Handler (Admin)</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all"
            style={{ backgroundColor: '#111827', marginTop: '10px' }}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-8 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
