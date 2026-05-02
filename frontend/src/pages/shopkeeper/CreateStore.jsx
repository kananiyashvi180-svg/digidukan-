import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceRecorder from '../../components/common/VoiceRecorder';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, Sparkles, Layout, CheckCircle, ArrowRight, Loader2, ChevronLeft, Mic } from 'lucide-react';
import { RURAL_TEMPLATES } from '../../constants/templates';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/v1`;

const CreateStore = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    tagline: '',
    description: '',
    phone: '',
    address: '',
    hours: '',
    color: '#3b82f6',
    theme: 'default',
    products: []
  });

  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleVoiceTranscript = async (text) => {
    if (!text) return;
    
    setLoading(true);
    const loadingToast = toast.loading('AI is building your dukan...');
    
    try {
      const response = await axios.post(`${API_URL}/shops/generate`, { text }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const aiData = response.data.data;
      setFormData(prev => ({
        ...prev,
        name: aiData.storeName || prev.name,
        category: aiData.category || prev.category,
        tagline: aiData.tagline || prev.tagline,
        products: aiData.products || prev.products,
        phone: aiData.phone || prev.phone || user?.phone || '',
        address: aiData.address || prev.address,
        hours: aiData.hours || prev.hours,
        color: aiData.color || prev.color,
        slug: aiData.slug
      }));
      
      toast.dismiss(loadingToast);
      toast.success('Dukan details generated! Please review.');
      setStep(2);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('AI processing failed. Please enter details manually.');
      console.error(error);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/shops`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Shop submitted! Waiting for handler approval.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create shop.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12 md:py-20">
      <SEO 
        title="Create Your Store | DigiDukan" 
        description="Launch your digital dukan in minutes using voice or text."
        noIndex={true}
      />
      <div className="container-custom max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-6 sm:mb-8">
            <div className="w-full sm:w-auto">
              <Link to="/dashboard" className="inline-flex items-center space-x-1 text-gray-400 hover:text-gray-900 font-bold text-xs uppercase tracking-widest mb-4 group transition-colors">
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Dashboard</span>
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">Setup Your <span className="text-blue-600">Digital Dukan</span></h1>
              <p className="text-gray-500 mt-2 font-medium">Step {step} of 4: <span className="text-gray-900">{
                step === 1 ? 'Voice Generation' : 
                step === 2 ? 'Review Details' : 
                step === 3 ? 'Choose Style' : 'Final Launch'
              }</span></p>
            </div>
            
            {/* Horizontal Progress Bar */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-1 sm:flex-none">
                  <div className={`h-2 sm:w-16 rounded-full transition-all duration-700 ${step >= i ? 'bg-blue-600' : 'bg-gray-200'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-6 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 text-blue-50/50 -mr-10 -mt-10">
                   <Mic size={160} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8 sm:mb-10">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Magical AI Builder</h2>
                      <p className="text-gray-500 text-sm">Just speak about your business in any language.</p>
                    </div>
                  </div>
                  
                  <VoiceRecorder onTranscript={handleVoiceTranscript} />
                  
                  <div className="mt-12 flex items-center justify-center">
                    <div className="h-px bg-gray-100 flex-1" />
                    <span className="px-6 text-gray-400 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Or go manual</span>
                    <div className="h-px bg-gray-100 flex-1" />
                  </div>
                  
                  <button 
                    onClick={() => setStep(2)}
                    className="btn-secondary w-full mt-10 !py-4"
                  >
                    <Layout size={20} />
                    <span>Enter Details Manually</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl shadow-gray-200/50 space-y-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold flex items-center space-x-3">
                <Layout className="text-blue-600" />
                <span>Basic Dukan Details</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Shop Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="input-responsive"
                    placeholder="e.g. Ravi Kirana Store"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <input 
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="input-responsive"
                    placeholder="e.g. Kirana, Bakery"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Tagline</label>
                  <input 
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleFormChange}
                    className="input-responsive"
                    placeholder="e.g. Fresh items at best price"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="input-responsive"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Opening Hours</label>
                  <input 
                    name="hours"
                    value={formData.hours}
                    onChange={handleFormChange}
                    className="input-responsive"
                    placeholder="e.g. 9 AM - 9 PM"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between pt-8 border-t border-gray-50 gap-4">
                <button onClick={() => setStep(1)} className="order-2 sm:order-1 px-8 py-4 font-bold text-gray-400 hover:text-gray-900 transition-colors">Back to Voice</button>
                <button onClick={() => setStep(3)} className="order-1 sm:order-2 btn-primary !py-4 px-10">
                  <span>Next Step: Choose Style</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl shadow-gray-200/50 space-y-8 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-bold">Select Visual Style</h2>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Premium Themes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {RURAL_TEMPLATES.map((t) => (
                  <div 
                    key={t.id}
                    onClick={() => setFormData(prev => ({ ...prev, color: t.colors.primary, theme: t.id }))}
                    className={`p-6 sm:p-8 rounded-[2rem] border-4 cursor-pointer transition-all ${
                      formData.theme === t.id ? 'border-blue-600 bg-blue-50/10' : 'border-gray-50 hover:border-gray-200 bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-center space-x-5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0" style={{ backgroundColor: t.colors.primary }}>
                        {t.name?.[0] || 'T'}
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">{t.name}</p>
                        <p className="text-sm text-gray-500 font-medium leading-tight">{t.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between pt-8 border-t border-gray-50 gap-4">
                <button onClick={() => setStep(2)} className="order-2 sm:order-1 px-8 py-4 font-bold text-gray-400 hover:text-gray-900 transition-colors">Back to Details</button>
                <button onClick={() => setStep(4)} className="order-1 sm:order-2 btn-primary !py-4 px-10">
                  <span>Almost Done</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl shadow-gray-200/50 space-y-10 border border-gray-100"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Your Dukan is Ready!</h2>
                <p className="text-gray-500 font-medium mt-2">Review your digital shop identity before we go live.</p>
              </div>
              
              <div className="bg-gray-50 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 blur-3xl -mr-16 -mt-16" />
                
                <div className="relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Store Name</label>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{formData.name}</p>
                </div>
                <div className="relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Category</label>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{formData.category}</p>
                </div>
                <div className="md:col-span-2 relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Tagline</label>
                  <p className="text-lg font-medium text-gray-700 italic leading-relaxed">"{formData.tagline}"</p>
                </div>
                <div className="md:col-span-2 relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Inventory Sync</label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.products.length > 0 ? formData.products.map((p, i) => (
                      <span key={i} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 shadow-sm">{p}</span>
                    )) : <span className="text-gray-400 italic font-medium">No products added yet</span>}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between pt-8 border-t border-gray-50 gap-4">
                <button onClick={() => setStep(3)} className="order-2 sm:order-1 px-8 py-4 font-bold text-gray-400 hover:text-gray-900 transition-colors">Change Theme</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="order-1 sm:order-2 btn-primary !py-5 !px-12 !text-lg"
                >
                  {loading ? (
                    <><Loader2 className="animate-spin" size={24} /> <span>Launching...</span></>
                  ) : (
                    <><ShoppingBag size={24} /> <span>Confirm & Publish</span></>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreateStore;
