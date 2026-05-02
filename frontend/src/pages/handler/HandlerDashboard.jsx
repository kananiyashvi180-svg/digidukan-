import SEO from '../../components/common/SEO';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, XCircle, Clock, Eye, Search, User, Mail, Calendar, 
  Store, ArrowUpRight, Shield, Phone, Tag, Package, LayoutDashboard,
  Activity, Globe, Zap, Settings
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/v1`;

const HandlerDashboard = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [shops, setShops] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { token } = useSelector((state) => state.auth);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'requests') {
        const response = await axios.get(`${API_URL}/shops/admin/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setShops(response.data.data.shops || []);
      } else if (activeTab === 'users') {
        const response = await axios.get(`${API_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data.data.users || []);
      } else if (activeTab === 'analytics') {
        const response = await axios.get(`${API_URL}/shops/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnalytics(response.data.data || null);
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}`, error);
      toast.error(`Failed to load ${activeTab}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, activeTab]);

  const handleUpdateStatus = async (shopId, status) => {
    try {
      await axios.patch(`${API_URL}/shops/admin/${shopId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Store is now ${status}!`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update store status');
    }
  };

  const filteredShops = useMemo(() => {
    return shops.filter(shop => 
      (shop.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       shop.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [shops, searchQuery]);

  const stats = [
    { label: 'Total Stores', value: shops.length, icon: Store, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Pending Approval', value: shops.filter(s => s.status === 'PENDING').length, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Live Sites', value: shops.filter(s => s.status === 'LIVE').length, icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Platform Users', value: users.length || 'Active', icon: Zap, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <SEO
        title="Admin Control | DigiDukan"
        description="Premium management portal for DigiDukan platform oversight."
        noIndex={true}
      />

      {/* Glass Sidebar / Nav */}
      <div className="fixed left-0 top-0 h-full w-24 bg-white/[0.02] border-r border-white/5 flex flex-col items-center py-10 space-y-12 z-50 backdrop-blur-xl">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-2xl shadow-blue-600/40">D</div>
        <div className="flex flex-col space-y-8">
          {[
            { id: 'requests', icon: LayoutDashboard },
            { id: 'analytics', icon: Activity },
            { id: 'users', icon: User },
            { id: 'settings', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={24} />
            </button>
          ))}
        </div>
      </div>

      <main className="pl-36 pr-12 py-12 max-w-[1600px] w-full">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-6xl font-display font-black mb-4 tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Control Center
            </h1>
            <p className="text-white/40 text-xl font-medium tracking-wide">
              {activeTab === 'requests' ? 'Reviewing platform growth and store submissions.' : 
               activeTab === 'analytics' ? 'Analyzing real-time business intelligence.' : 'Managing global user directory.'}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick search..."
                className="bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 w-80 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-white/10"
              />
            </div>
          </div>
        </header>

        {activeTab === 'requests' && (
          <div className="space-y-12">
            {/* Minimal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white/[0.03] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} blur-[80px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-6`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-4xl font-black">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Request List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-2xl font-bold flex items-center space-x-3">
                  <span className="w-2 h-8 bg-blue-600 rounded-full" />
                  <span>Submission Queue</span>
                </h2>
                <div className="text-white/20 text-sm font-black uppercase tracking-widest">Showing {filteredShops.length} results</div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {loading ? (
                  <div className="py-20 text-center text-white/10 italic animate-pulse">Synchronizing database...</div>
                ) : filteredShops.map((shop) => (
                  <motion.div 
                    layout
                    key={shop._id}
                    className="bg-white/[0.02] border border-white/5 p-8 rounded-[40px] flex items-center justify-between hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex items-center space-x-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-[32px] flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden relative">
                        {shop.logo ? (
                          <img src={shop.logo} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <Store size={40} className="text-white/10" />
                        )}
                        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-3xl font-black tracking-tight">{shop.name}</h3>
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            shop.status === 'LIVE' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
                            shop.status === 'PENDING' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 
                            'bg-rose-500/10 border-rose-500/30 text-rose-400'
                          }`}>
                            {shop.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-8 text-white/30 font-bold uppercase text-xs tracking-widest">
                          <div className="flex items-center space-x-2"><User size={14} className="text-blue-500" /> <span>{shop.owner?.name}</span></div>
                          <div className="flex items-center space-x-2"><Tag size={14} className="text-blue-500" /> <span>{shop.category}</span></div>
                          <div className="flex items-center space-x-2"><Calendar size={14} className="text-blue-500" /> <span>{new Date(shop.createdAt).toLocaleDateString()}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {shop.status === 'PENDING' ? (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(shop._id, 'LIVE')}
                            className="bg-white text-black px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-white/5"
                          >
                            Approve Store
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(shop._id, 'REJECTED')}
                            className="bg-white/5 text-white/40 px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-rose-600 hover:text-white transition-all"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                         <button className="bg-white/5 text-white/20 px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest border border-white/10 cursor-not-allowed">
                           Action Locked
                         </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics and Users would follow similar premium styles */}
        {activeTab !== 'requests' && (
          <div className="py-20 text-center text-white/20 font-bold text-2xl uppercase tracking-[0.2em]">
             Module under synchronization...
          </div>
        )}
      </main>
    </div>
  );
};

export default HandlerDashboard;
