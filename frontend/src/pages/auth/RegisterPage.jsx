import SEO from '../../components/common/SEO';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Phone, UserCircle, ArrowRight, Loader2 } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Create Account | DigiDukan — Start Your Online Store for Free"
        description="Join 50,000+ local shopkeepers on DigiDukan. Sign up for free and create your professional online store in minutes — no coding, just speaking."
        keywords="digidukan register, create online store india, free kirana website, start digital dukan, local shop signup"
        noIndex={true}
      />

      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform">D</div>
            <span className="text-3xl font-bold tracking-tight text-gray-900">DigiDukan</span>
          </Link>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-3 text-lg">Join DigiDukan and go digital today</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="input-responsive !pl-12"
                  placeholder="John Doe" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="input-responsive !pl-12"
                  placeholder="name@example.com" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="input-responsive !pl-12"
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  className="input-responsive !pl-12"
                  placeholder="9876543210" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">I am a...</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserCircle size={18} className="text-gray-400" />
                </div>
                <select 
                  name="role"
                  value={role}
                  onChange={onChange}
                  className="input-responsive !pl-12 appearance-none bg-gray-50/50"
                >
                  <option value="SHOPKEEPER">Shopkeeper (Dukandar)</option>
                  <option value="HANDLER">Handler (Admin)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary !py-4 w-full text-lg mt-4 shadow-blue-500/10"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-gray-600 font-medium">
              Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login Now</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center pb-8">
          <Link to="/" className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
