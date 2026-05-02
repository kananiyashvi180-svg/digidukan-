import SEO from '../../components/common/SEO';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, XCircle, Clock, Eye, Search, User, Mail, Calendar, 
  Store, ArrowUpRight, Shield, Phone, Tag, Package, LayoutDashboard,
  Activity, Globe, Zap, Settings, Menu, X, LogOut, ChevronRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://digidukan-backend.vercel.app';
const API_URL = `${BASE_URL}/api/v1`;

const HandlerDashboard = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [shops, setShops] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, user: currentUser } = useSelector((state) => state.auth);

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

  const menuItems = [
    { id: 'requests', icon: LayoutDashboard, label: 'Requests' },
    { id: 'analytics', icon: Activity, label: 'Analytics' },
    { id: 'users', icon: User, label: 'Users' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <SEO
        title="Admin Control | DigiDukan"
        description="Premium management portal for DigiDukan platform oversight."
        noIndex={true}
      />

      {/* Desktop Glass Sidebar */}
      <aside className="hidden lg:flex w-24 bg-white/[0.02] border-r border-white/5 flex-col items-center py-10 space-y-12 sticky top-0 h-screen z-50 backdrop-blur-xl">
        <Link to="/" className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-2xl shadow-blue-600/40 hover:scale-110 transition-transform">D</Link>
        <div className="flex flex-col space-y-8">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-4 rounded-2xl transition-all relative group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={24} />
              <span className="absolute left-full ml-4 px-2 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <button className="mt-auto p-4 rounded-2xl text-white/20 hover:text-red-500 transition-all">
          <LogOut size={24} />
        </button>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between px-6 h-16 bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-[60]">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black">D</div>
          <span className="font-bold tracking-tight">Admin Control</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/60">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-16 left-0 right-0 bg-[#0a0a0a] border-b border-white/10 z-50 p-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                  className={`flex items-center space-x-3 p-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'}`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <button className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl bg-white/5 text-red-500 font-bold mt-4">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto w-full">
        <header className="mb-10 sm:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Control Center
            </h1>
            <p className="text-white/40 text-sm sm:text-base lg:text-xl font-medium tracking-wide max-w-xl">
              {activeTab === 'requests' ? 'Reviewing platform growth and store submissions.' : 
               activeTab === 'analytics' ? 'Analyzing real-time business intelligence.' : 'Managing global user directory.'}
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shops or owners..."
                className="bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-white/10"
              />
            </div>
          </div>
        </header>

        {activeTab === 'requests' && (
          <div className="space-y-10 sm:space-y-16">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="bg-white/[0.03] border border-white/5 p-5 sm:p-8 rounded-3xl sm:rounded-[32px] relative overflow-hidden group"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 ${stat.bg} blur-[60px] sm:blur-[80px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-4xl font-black">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Submission Queue */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center space-x-3 w-full sm:w-auto">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  <span>Submission Queue</span>
                </h2>
                <div className="text-white/20 text-[10px] font-black uppercase tracking-widest w-full sm:w-auto sm:text-right">Showing {filteredShops.length} results</div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {loading ? (
                  <div className="py-20 text-center flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
                    <span className="text-white/20 font-bold italic">Synchronizing database...</span>
                  </div>
                ) : filteredShops.length === 0 ? (
                  <div className="py-20 bg-white/[0.01] border border-white/5 rounded-[40px] text-center text-white/20">
                    No matching requests found.
                  </div>
                ) : (
                  filteredShops.map((shop) => (
                    <motion.div 
                      layout
                      key={shop._id}
                      className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-3xl sm:rounded-[40px] flex flex-col xl:flex-row items-center justify-between gap-8 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full xl:w-auto text-center sm:text-left">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-[32px] flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden shrink-0 relative">
                          {shop.logo ? (
                            <img src={shop.logo} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <Store size={32} className="text-white/10" />
                          )}
                          <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
                            <h3 className="text-2xl sm:text-3xl font-black tracking-tight truncate max-w-xs">{shop.name}</h3>
                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${shop.status === 'LIVE' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : shop.status === 'PENDING' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
                              {shop.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 text-white/30 font-bold uppercase text-[10px] tracking-widest">
                            <div className="flex items-center space-x-2"><User size={12} className="text-blue-500" /> <span>{shop.owner?.name}</span></div>
                            <div className="flex items-center space-x-2"><Tag size={12} className="text-blue-500" /> <span>{shop.category}</span></div>
                            <div className="flex items-center space-x-2"><Calendar size={12} className="text-blue-500" /> <span>{new Date(shop.createdAt).toLocaleDateString()}</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {shop.status === 'PENDING' ? (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(shop._id, 'LIVE')}
                              className="flex-1 sm:flex-none bg-white text-black px-6 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-white/5 whitespace-nowrap"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(shop._id, 'REJECTED')}
                              className="flex-1 sm:flex-none bg-white/5 text-white/40 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-[10px] uppercase tracking-widest border border-white/10 hover:bg-rose-600 hover:text-white transition-all whitespace-nowrap"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                           <div className="w-full sm:w-auto bg-white/5 text-white/20 px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-[10px] uppercase tracking-widest border border-white/10 text-center italic">
                             Status Finalized
                           </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center space-x-3 w-full sm:w-auto">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                <span>Platform Users</span>
              </h2>
              <div className="text-white/20 text-[10px] font-black uppercase tracking-widest w-full sm:w-auto sm:text-right">Total {users.length} registered</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                 <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
                    <span className="text-white/20 font-bold italic">Querying user directory...</span>
                 </div>
              ) : users.length === 0 ? (
                <div className="col-span-full py-20 bg-white/[0.01] border border-white/5 rounded-[40px] text-center text-white/20">
                  No users found in the database.
                </div>
              ) : (
                users.map((u, i) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    key={u._id}
                    className="bg-white/[0.02] border border-white/5 p-8 rounded-[40px] hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-2xl flex items-center justify-center border border-white/10 text-indigo-400 font-black text-2xl">
                        {u.name?.[0]}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-xl font-bold truncate">{u.name}</h3>
                        <p className="text-white/40 text-xs truncate">{u.email}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-white/20">Role</span>
                        <span className="text-indigo-400">{u.role}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-white/20">Joined</span>
                        <span className="text-white/60">{new Date(u.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-12">
            <div className="flex items-center space-x-3 px-2">
              <span className="w-1.5 h-6 bg-emerald-600 rounded-full" />
              <h2 className="text-xl sm:text-2xl font-bold">Platform Business Intelligence</h2>
            </div>

            {loading ? (
               <div className="py-20 text-center flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" />
                  <span className="text-white/20 font-bold italic">Synthesizing platform metrics...</span>
               </div>
            ) : !analytics ? (
              <div className="py-20 bg-white/[0.01] border border-white/5 rounded-[40px] text-center text-white/20">
                Analytics data temporarily unavailable.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px] space-y-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">Store Distribution</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Live Sites', count: analytics.stats?.liveShops || 0, color: 'bg-emerald-500', total: analytics.stats?.totalShops || 1 },
                      { label: 'Pending Approval', count: analytics.stats?.pendingShops || 0, color: 'bg-amber-500', total: analytics.stats?.totalShops || 1 },
                      { label: 'Rejected', count: analytics.stats?.rejectedShops || 0, color: 'bg-rose-500', total: analytics.stats?.totalShops || 1 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span>{item.label}</span>
                          <span className="text-white/40">{item.count} stores</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.count / item.total) * 100}%` }}
                            className={`h-full ${item.color}`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600/20 to-transparent border border-white/5 p-10 rounded-[40px] flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-6">
                    <Activity size={32} className="text-blue-400" />
                  </div>
                  <h3 className="text-5xl font-black mb-2">{analytics.stats?.totalUsers || 0}</h3>
                  <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest mb-8">Active Partners</p>
                  <div className="grid grid-cols-2 gap-8 w-full border-t border-white/5 pt-8">
                    <div>
                      <p className="text-xl font-bold">{analytics.stats?.totalProducts || 0}</p>
                      <p className="text-[10px] text-white/20 font-black uppercase">Products</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{analytics.stats?.totalShops || 0}</p>
                      <p className="text-[10px] text-white/20 font-black uppercase">Shops</p>
                    </div>
                  </div>
                </div>

                {/* Category Breakdown */}
                {analytics.categoryStats?.length > 0 && (
                  <div className="col-span-full bg-white/[0.01] border border-white/5 p-10 rounded-[40px]">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/30 mb-8 text-center">Marketplace Categories</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                       {analytics.categoryStats.map((cat, i) => (
                         <div key={i} className="px-6 py-4 bg-white/5 rounded-2xl border border-white/5 text-center min-w-[140px]">
                            <p className="text-xl font-black">{cat.count}</p>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest truncate">{cat._id || 'General'}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="py-20 text-center flex flex-col items-center gap-6">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                <Settings size={32} className="text-white/10" />
             </div>
             <p className="text-white/20 font-black text-xl sm:text-2xl uppercase tracking-[0.2em] italic">
               Admin Module Synchronization Active...
             </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HandlerDashboard;
