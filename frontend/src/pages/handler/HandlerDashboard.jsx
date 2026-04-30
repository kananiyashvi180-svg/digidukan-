import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Eye, Filter, Search, User, Mail, Calendar, BarChart3, Users, Store, ArrowUpRight, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/v1`;

const HandlerDashboard = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { token } = useSelector((state) => state.auth);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/shops/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShops(response.data.data.shops || []);
    } catch (error) {
      console.error('Error fetching shops', error);
      toast.error('Failed to load store requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [token]);

  const handleUpdateStatus = async (shopId, status) => {
    try {
      await axios.patch(`${API_URL}/shops/admin/${shopId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Shop ${status.toLowerCase()} successfully!`);
      fetchShops();
    } catch (error) {
      toast.error('Failed to update shop status');
    }
  };

  const filteredShops = useMemo(() => {
    return shops.filter(shop => 
      (shop.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       shop.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [shops, searchQuery]);

  const stats = [
    { label: 'Total Stores', value: shops.length, icon: Store, color: 'text-blue-500' },
    { label: 'Pending Approval', value: shops.filter(s => s.status === 'PENDING').length, icon: Clock, color: 'text-yellow-500' },
    { label: 'Live Stores', value: shops.filter(s => s.status === 'LIVE').length, icon: CheckCircle, color: 'text-green-500' },
    { label: 'Active Users', value: new Set(shops.map(s => s.owner?._id)).size, icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans pb-20">
      {/* Sub Header / Tab Nav */}
      <div className="h-20 bg-black/40 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-12 sticky top-20 z-30">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('requests')}
              className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'requests' ? 'text-blue-500 underline underline-offset-8 decoration-2' : 'text-white/40 hover:text-white'}`}
            >
              Requests
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'analytics' ? 'text-blue-500 underline underline-offset-8 decoration-2' : 'text-white/40 hover:text-white'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'text-blue-500 underline underline-offset-8 decoration-2' : 'text-white/40 hover:text-white'}`}
            >
              Users
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-500/20">H</div>
        </div>
      </div>

      <main className="p-12 max-w-[1600px] mx-auto w-full">
        {activeTab === 'requests' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 p-8 rounded-[32px] group hover:border-blue-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-4 rounded-2xl bg-white/[0.03] ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <ArrowUpRight className="text-white/10 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-4xl font-display font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 space-y-6 lg:space-y-0">
              <div>
                <h1 className="text-5xl font-display font-bold mb-2 tracking-tight">Review Queue</h1>
                <p className="text-white/40 text-lg font-medium">Manage incoming store submissions and verified shopkeepers.</p>
              </div>
              <div className="flex space-x-4">
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-16 pr-8 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none w-[350px] transition-all font-bold placeholder:text-white/10" 
                    placeholder="Search stores or owners..." 
                  />
                </div>
              </div>
            </div>

            {/* Request Queue Table */}
            <div className="bg-white/[0.02] rounded-[48px] border border-white/5 overflow-hidden shadow-2xl backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.01] border-b border-white/5">
                    <th className="p-10 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Shop Identity</th>
                    <th className="p-10 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Category</th>
                    <th className="p-10 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Status</th>
                    <th className="p-10 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Submitted</th>
                    <th className="p-10 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-right">Decisions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan="5" className="p-32 text-center text-white/10 italic text-xl">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span>Synchronizing approval queue...</span>
                      </div>
                    </td></tr>
                  ) : filteredShops.length === 0 ? (
                    <tr><td colSpan="5" className="p-32 text-center text-white/10 italic text-xl">No requests match your search criteria.</td></tr>
                  ) : (
                    filteredShops.map((shop) => (
                      <tr key={shop._id} className="hover:bg-white/[0.01] transition-all group">
                        <td className="p-10">
                          <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-white/[0.05] to-transparent rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                               <div className="text-xl font-black text-white/20 uppercase">{shop.name?.[0] || 'S'}</div>
                            </div>
                            <div>
                              <p className="font-bold text-white text-xl mb-1 group-hover:text-blue-500 transition-colors">{shop.name || 'Untitled Store'}</p>
                              <div className="flex items-center space-x-4 text-xs text-white/30 font-bold uppercase tracking-wider">
                                 <div className="flex items-center space-x-2"><User size={12} className="text-blue-500" /> <span>{shop.owner?.name}</span></div>
                                 <div className="flex items-center space-x-2"><Mail size={12} className="text-blue-500" /> <span>{shop.owner?.email}</span></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-10">
                          <span className="px-5 py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">{shop.category || 'General'}</span>
                        </td>
                        <td className="p-10">
                          <div className={`inline-flex items-center space-x-3 px-4 py-2 rounded-xl border ${shop.status === 'PENDING' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : shop.status === 'LIVE' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                            <div className={`w-2 h-2 rounded-full ${shop.status === 'PENDING' ? 'bg-yellow-500 animate-pulse' : shop.status === 'LIVE' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-xs font-black uppercase tracking-widest">{shop.status}</span>
                          </div>
                        </td>
                        <td className="p-10 text-sm text-white/30 font-bold uppercase tracking-tighter">
                          <div className="flex items-center space-x-3">
                            <Calendar size={14} className="text-blue-500" />
                            <span>{new Date(shop.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </td>
                        <td className="p-10">
                          <div className="flex items-center justify-end space-x-4">
                            <button className="p-4 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5"><Eye size={20} /></button>
                            {shop.status === 'PENDING' && (
                              <>
                                <button 
                                  onClick={() => handleUpdateStatus(shop._id, 'LIVE')}
                                  className="px-6 py-4 bg-green-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-500/20 hover:scale-105 transition-all"
                                >
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleUpdateStatus(shop._id, 'REJECTED')}
                                  className="px-6 py-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border border-red-500/20 transition-all"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 space-y-6">
             <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-500">
                <BarChart3 size={48} />
             </div>
             <h2 className="text-4xl font-bold">Deep Analytics Coming Soon</h2>
             <p className="text-white/40 max-w-md mx-auto">We are building advanced store metrics, heatmaps, and growth projections for your dashboard.</p>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 space-y-6">
             <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto text-purple-500">
                <Users size={48} />
             </div>
             <h2 className="text-4xl font-bold">User Management Hub</h2>
             <p className="text-white/40 max-w-md mx-auto">Soon you will be able to manage all shopkeepers and customers directly from this panel.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default HandlerDashboard;

