import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceRecorder from '../../components/common/VoiceRecorder';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, Sparkles, Layout, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Build Your Digital Presence</h1>
              <p className="text-gray-500 font-medium">Step {step} of 4: {
                step === 1 ? 'Voice Generation' : 
                step === 2 ? 'Review Details' : 
                step === 3 ? 'Choose Style' : 'Final Launch'
              }</p>
            </div>
            <div className="flex space-x-2 pb-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-2 w-16 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-600' : 'bg-gray-200'}`} />
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
              <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Magical AI Builder</h2>
                    <p className="text-gray-500">Just speak about your business in any language.</p>
                  </div>
                </div>
                
                <VoiceRecorder onTranscript={handleVoiceTranscript} />
                
                <div className="mt-10 flex items-center justify-center">
                  <div className="h-px bg-gray-100 flex-1" />
                  <span className="px-6 text-gray-400 text-xs font-black uppercase tracking-widest">Or go manual</span>
                  <div className="h-px bg-gray-100 flex-1" />
                </div>
                
                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-10 py-5 border-2 border-gray-100 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                >
                  <Layout size={20} />
                  <span>Enter Details Manually</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-12 rounded-[40px] shadow-2xl shadow-gray-200/50 space-y-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold flex items-center space-x-3">
                <Layout className="text-blue-600" />
                <span>Basic Dukan Details</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Shop Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="e.g. Ravi Kirana Store"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Category</label>
                  <input 
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="e.g. Kirana, Bakery"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Tagline</label>
                  <input 
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleFormChange}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="e.g. Fresh items at best price"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Opening Hours</label>
                  <input 
                    name="hours"
                    value={formData.hours}
                    onChange={handleFormChange}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="e.g. 9 AM - 9 PM"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-50">
                <button onClick={() => setStep(1)} className="px-8 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors">Back</button>
                <button onClick={() => setStep(3)} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:scale-105 transition-all">Choose Theme</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-12 rounded-[40px] shadow-2xl shadow-gray-200/50 space-y-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold">Select Visual Style</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RURAL_TEMPLATES.map((t) => (
                  <div 
                    key={t.id}
                    onClick={() => setFormData(prev => ({ ...prev, color: t.colors.primary, theme: t.id }))}
                    className={`p-8 rounded-3xl border-2 cursor-pointer transition-all ${formData.theme === t.id ? 'border-blue-600 bg-blue-50/30' : 'border-gray-50 hover:border-gray-200'}`}
                  >
                    <div className="flex items-center space-x-5">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg" style={{ backgroundColor: t.colors.primary }}>
                        {t.name?.[0] || 'T'}
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">{t.name}</p>
                        <p className="text-sm text-gray-500 font-medium">{t.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-6 border-t border-gray-50">
                <button onClick={() => setStep(2)} className="px-8 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors">Back</button>
                <button onClick={() => setStep(4)} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:scale-105 transition-all">Review & Launch</button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-12 rounded-[40px] shadow-2xl shadow-gray-200/50 space-y-10 border border-gray-100"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Your Dukan is Ready!</h2>
                <p className="text-gray-500 font-medium">Review your digital shop identity before we go live.</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-[32px] grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 border border-gray-100">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Store Name</label>
                  <p className="text-xl font-bold text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Category</label>
                  <p className="text-xl font-bold text-gray-900">{formData.category}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Tagline</label>
                  <p className="text-lg font-medium text-gray-700 italic">"{formData.tagline}"</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Products Detected</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.products.map((p, i) => (
                      <span key={i} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-50">
                <button onClick={() => setStep(3)} className="px-8 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors">Change Theme</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-2xl flex items-center space-x-3 hover:scale-105 active:scale-95 transition-all"
                >
                  {loading ? (
                    <><Loader2 className="animate-spin" /> <span>Launching...</span></>
                  ) : (
                    <><ShoppingBag /> <span>Confirm & Publish</span></>
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

