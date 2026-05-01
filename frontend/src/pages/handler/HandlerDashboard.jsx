import SEO from '../../components/common/SEO';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, XCircle, Clock, Eye, Filter, Search, User, Mail, Calendar, 
  BarChart3, Users, Store, ArrowUpRight, TrendingUp, Shield, MapPin, 
  Phone, Tag, Package, AlertCircle
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
      toast.success(`Shop ${status.toLowerCase()} successfully!`);
      fetchData();
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

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
       user.email?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [users, searchQuery]);

  const stats = [
    { label: 'Total Stores', value: shops.length, icon: Store, color: 'text-blue-500' },
    { label: 'Pending Approval', value: shops.filter(s => s.status === 'PENDING').length, icon: Clock, color: 'text-yellow-500' },
    { label: 'Live Stores', value: shops.filter(s => s.status === 'LIVE').length, icon: CheckCircle, color: 'text-green-500' },
    { label: 'Active Users', value: users.length || new Set(shops.map(s => s.owner?._id)).size, icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans pb-20">
      <SEO
        title="Handler Admin | DigiDukan — Store Approval Dashboard"
        description="DigiDukan handler dashboard for approving store requests, managing shopkeepers, and overseeing platform operations."
        keywords="digidukan admin, handler dashboard, store approval, platform management"
        noIndex={true}
      />

      {/* Sub Header / Tab Nav */}
      <div className="h-20 bg-black/40 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-12 sticky top-20 z-30">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-8">
            {['requests', 'analytics', 'users'].map((tab) => (
              <button 
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery('');
                }}
                className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-blue-500 underline underline-offset-8 decoration-2' : 'text-white/40 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-display font-bold mb-2 tracking-tight">Platform Insights</h2>
                <p className="text-white/40 text-lg font-medium">Real-time performance and distribution metrics.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-2xl flex items-center space-x-3 text-blue-400">
                <TrendingUp size={20} />
                <span className="font-black text-xs uppercase tracking-widest">Live Updates</span>
              </div>
            </div>

            {analytics && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {[
                    { label: 'Total Shops', value: analytics.stats.totalShops, icon: Store, color: 'text-blue-500' },
                    { label: 'Live Shops', value: analytics.stats.liveShops, icon: CheckCircle, color: 'text-green-500' },
                    { label: 'Pending', value: analytics.stats.pendingShops, icon: Clock, color: 'text-yellow-500' },
                    { label: 'Total Users', value: analytics.stats.totalUsers, icon: Users, color: 'text-purple-500' },
                    { label: 'Products', value: analytics.stats.totalProducts, icon: Package, color: 'text-orange-500' },
                    { label: 'Rejected', value: analytics.stats.rejectedShops, icon: XCircle, color: 'text-red-500' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-[24px]">
                      <div className={`mb-4 ${s.color}`}><s.icon size={20} /></div>
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="text-2xl font-bold">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   {/* Category Distribution */}
                   <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[48px]">
                      <div className="flex items-center space-x-4 mb-10">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Tag size={20} /></div>
                        <h3 className="text-2xl font-bold">Category Distribution</h3>
                      </div>
                      <div className="space-y-6">
                        {analytics.categoryStats.map((cat, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                              <span className="text-white/60">{cat._id || 'Uncategorized'}</span>
                              <span className="text-blue-500">{cat.count} Stores</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(cat.count / analytics.stats.totalShops) * 100}%` }}
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>

                   {/* Recent Activity */}
                   <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[48px]">
                      <div className="flex items-center space-x-4 mb-10">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><Clock size={20} /></div>
                        <h3 className="text-2xl font-bold">Recent Submissions</h3>
                      </div>
                      <div className="space-y-6">
                        {analytics.recentShops.map((shop, i) => (
                          <div key={i} className="flex items-center justify-between p-6 bg-white/[0.01] border border-white/5 rounded-3xl group hover:bg-white/[0.02] transition-all">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-white/20">
                                {shop.name?.[0]}
                              </div>
                              <div>
                                <p className="font-bold text-white group-hover:text-blue-500 transition-colors">{shop.name}</p>
                                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">{shop.owner?.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-black text-blue-500 uppercase tracking-widest">{shop.status}</p>
                              <p className="text-[10px] text-white/20 font-medium">{new Date(shop.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 space-y-6 lg:space-y-0">
              <div>
                <h1 className="text-5xl font-display font-bold mb-2 tracking-tight">User Directory</h1>
                <p className="text-white/40 text-lg font-medium">Oversee all registered shopkeepers and platform users.</p>
              </div>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 pr-8 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none w-[350px] transition-all font-bold placeholder:text-white/10" 
                  placeholder="Search users..." 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-full py-32 text-center text-white/10 animate-pulse text-2xl font-display font-bold uppercase tracking-widest">Loading User Data...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="col-span-full py-32 text-center text-white/10 text-2xl font-display font-bold uppercase tracking-widest">No users found.</div>
              ) : (
                filteredUsers.map((u) => (
                  <div key={u._id} className="bg-white/[0.02] border border-white/5 p-8 rounded-[40px] hover:border-blue-500/30 transition-all group">
                    <div className="flex items-center space-x-6 mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[24px] flex items-center justify-center border border-white/5 shadow-xl">
                        <User size={32} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold group-hover:text-blue-500 transition-colors">{u.name}</h3>
                        <div className="flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full w-fit mt-2">
                           <Shield size={12} className={u.role === 'HANDLER' ? 'text-purple-500' : 'text-blue-500'} />
                           <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{u.role}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t border-white/5">
                       <div className="flex items-center space-x-4 text-white/30 hover:text-white transition-colors">
                          <Mail size={16} className="text-blue-500" />
                          <span className="text-sm font-medium">{u.email}</span>
                       </div>
                       {u.phone && (
                         <div className="flex items-center space-x-4 text-white/30 hover:text-white transition-colors">
                            <Phone size={16} className="text-blue-500" />
                            <span className="text-sm font-medium">{u.phone}</span>
                         </div>
                       )}
                       <div className="flex items-center space-x-4 text-white/30">
                          <Calendar size={16} className="text-blue-500" />
                          <span className="text-sm font-medium">Joined {new Date(u.createdAt).toLocaleDateString()}</span>
                       </div>
                    </div>

                    <button className="w-full mt-8 py-4 bg-white/5 hover:bg-blue-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/5 transition-all">View Full Profile</button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default HandlerDashboard;
