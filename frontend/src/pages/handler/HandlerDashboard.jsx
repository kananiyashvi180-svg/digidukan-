import SEO from '../../components/common/SEO';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, Calendar, Store, Tag,
  Package, LayoutDashboard, Activity, Globe,
  Settings, Menu, X, LogOut, Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

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
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all data at once on mount
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [shopsRes, usersRes, analyticsRes] = await Promise.allSettled([
          axios.get(`${API_URL}/shops/admin/all`, { headers }),
          axios.get(`${API_URL}/auth/users`, { headers }),
          axios.get(`${API_URL}/shops/admin/analytics`, { headers }),
        ]);

        if (shopsRes.status === 'fulfilled') setShops(shopsRes.value.data.data.shops || []);
        if (usersRes.status === 'fulfilled') setUsers(usersRes.value.data.data.users || []);
        if (analyticsRes.status === 'fulfilled') setAnalytics(analyticsRes.value.data.data || null);
      } catch (err) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAll();
  }, [token]);

  const handleUpdateStatus = async (shopId, status) => {
    try {
      await axios.patch(`${API_URL}/shops/admin/${shopId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Store marked as ${status}!`);
      setShops(prev => prev.map(s => s._id === shopId ? { ...s, status } : s));
    } catch {
      toast.error('Failed to update store status');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const filteredShops = useMemo(() =>
    shops.filter(shop =>
      shop.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ), [shops, searchQuery]);

  const filteredUsers = useMemo(() =>
    users.filter(u =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    ), [users, searchQuery]);

  const summaryStats = [
    { label: 'Total Stores', value: shops.length, icon: Store, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Pending', value: shops.filter(s => s.status === 'PENDING').length, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Live Sites', value: shops.filter(s => s.status === 'LIVE').length, icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Users', value: users.length, icon: User, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  ];

  const menuItems = [
    { id: 'requests', icon: LayoutDashboard, label: 'Requests' },
    { id: 'analytics', icon: Activity, label: 'Analytics' },
    { id: 'users', icon: User, label: 'Users' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const tabSubtitles = {
    requests: 'Review and approve store submissions.',
    analytics: 'Analyzing real-time business intelligence.',
    users: 'Managing global user directory.',
    settings: 'Platform configuration.',
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <SEO title="Admin Control | DigiDukan" description="Premium management portal." noIndex={true} />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-24 bg-white/[0.02] border-r border-white/5 flex-col items-center py-10 space-y-8 sticky top-0 h-screen z-50">
        <Link to="/" className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-2xl shadow-blue-600/40 hover:scale-110 transition-transform">D</Link>
        <div className="flex flex-col space-y-4 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`p-4 rounded-2xl transition-all relative group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={22} />
              <span className="absolute left-full ml-3 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <button onClick={handleLogout} className="p-4 rounded-2xl text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Logout">
          <LogOut size={22} />
        </button>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-6 h-16 bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-[60]">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black">D</div>
          <span className="font-bold tracking-tight">Admin Control</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/60">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-16 left-0 right-0 bg-[#0d0d0d] border-b border-white/10 z-50 p-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                  className={`flex items-center space-x-3 p-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'}`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl bg-white/5 text-red-400 font-bold mt-3">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 w-full max-w-[1600px] mx-auto">

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Control <span className="text-blue-500">Center</span>
            </h1>
            <p className="text-white/30 mt-2 font-medium">{tabSubtitles[activeTab]}</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shops or owners..."
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 w-full outline-none focus:ring-2 focus:ring-blue-500/40 font-medium placeholder:text-white/20 text-sm"
            />
          </div>
        </div>

        {/* Summary Stats — always visible */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {summaryStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.02] border border-white/5 p-5 sm:p-7 rounded-3xl"
            >
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon size={18} />
              </div>
              <p className="text-2xl sm:text-3xl font-black">{loading ? '—' : stat.value}</p>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── REQUESTS TAB ── */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1 mb-4">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
                Submission Queue
              </h2>
              <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">{filteredShops.length} results</span>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
                <span className="text-white/20 font-bold italic text-sm">Syncing database...</span>
              </div>
            ) : filteredShops.length === 0 ? (
              <div className="py-20 border border-white/5 rounded-[40px] text-center text-white/20 font-bold">
                No shop submissions found.
              </div>
            ) : (
              filteredShops.map((shop) => (
                <motion.div
                  layout
                  key={shop._id}
                  className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-center gap-6 w-full xl:w-auto">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 overflow-hidden">
                      {shop.logo ? <img src={shop.logo} className="w-full h-full object-cover" alt="" /> : <Store size={28} className="text-white/10" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-black">{shop.name}</h3>
                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${shop.status === 'LIVE' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : shop.status === 'PENDING' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
                          {shop.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                        <span className="flex items-center gap-1.5"><User size={10} className="text-blue-400" />{shop.owner?.name || 'Unknown'}</span>
                        <span className="flex items-center gap-1.5"><Tag size={10} className="text-blue-400" />{shop.category}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={10} className="text-blue-400" />{new Date(shop.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full xl:w-auto">
                    {shop.status === 'PENDING' ? (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(shop._id, 'LIVE')}
                          className="flex-1 xl:flex-none bg-white text-black px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(shop._id, 'REJECTED')}
                          className="flex-1 xl:flex-none bg-white/5 text-white/40 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 hover:bg-rose-600 hover:text-white transition-all"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <div className="bg-white/5 text-white/20 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 italic">
                        Status Finalized
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* ── ANALYTICS TAB ── */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 px-1">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
              <h2 className="text-xl font-bold">Platform Business Intelligence</h2>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" />
                <span className="text-white/20 font-bold italic text-sm">Synthesizing metrics...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Store Distribution */}
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px] space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Store Distribution</h3>
                  {[
                    { label: 'Live', count: analytics?.stats?.liveShops ?? shops.filter(s => s.status === 'LIVE').length, color: 'bg-emerald-500' },
                    { label: 'Pending', count: analytics?.stats?.pendingShops ?? shops.filter(s => s.status === 'PENDING').length, color: 'bg-amber-500' },
                    { label: 'Rejected', count: analytics?.stats?.rejectedShops ?? shops.filter(s => s.status === 'REJECTED').length, color: 'bg-rose-500' },
                  ].map((item, i) => {
                    const total = analytics?.stats?.totalShops || shops.length || 1;
                    return (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span>{item.label}</span>
                          <span className="text-white/40">{item.count} stores</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.count / total) * 100}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Key Metrics */}
                <div className="bg-gradient-to-br from-blue-600/15 to-transparent border border-white/5 p-8 rounded-[32px] flex flex-col justify-center">
                  <Activity size={32} className="text-blue-400 mb-6" />
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'Total Users', value: analytics?.stats?.totalUsers ?? users.length },
                      { label: 'Total Shops', value: analytics?.stats?.totalShops ?? shops.length },
                      { label: 'Products', value: analytics?.stats?.totalProducts ?? '—' },
                      { label: 'Live Shops', value: analytics?.stats?.liveShops ?? shops.filter(s => s.status === 'LIVE').length },
                    ].map((m, i) => (
                      <div key={i}>
                        <p className="text-3xl font-black">{m.value}</p>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Breakdown */}
                {analytics?.categoryStats?.length > 0 && (
                  <div className="col-span-full bg-white/[0.01] border border-white/5 p-8 rounded-[32px]">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6 text-center">Category Breakdown</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                      {analytics.categoryStats.map((cat, i) => (
                        <div key={i} className="px-5 py-4 bg-white/5 rounded-2xl border border-white/5 text-center min-w-[120px]">
                          <p className="text-2xl font-black">{cat.count}</p>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">{cat._id || 'General'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="w-1.5 h-5 bg-indigo-500 rounded-full" />
                Platform Users
              </h2>
              <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">{filteredUsers.length} registered</span>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
                <span className="text-white/20 font-bold italic text-sm">Loading user directory...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-20 border border-white/5 rounded-[40px] text-center text-white/20 font-bold">
                No users found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((u, i) => (
                  <motion.div
                    key={u._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white/[0.02] border border-white/5 p-7 rounded-[28px] hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-2xl flex items-center justify-center border border-white/10 text-indigo-400 font-black text-xl shrink-0">
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-lg leading-tight truncate">{u.name}</p>
                        <p className="text-white/30 text-xs truncate">{u.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2.5 border-t border-white/5 pt-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-white/20">Role</span>
                        <span className={u.role === 'HANDLER' ? 'text-blue-400' : 'text-indigo-400'}>{u.role}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-white/20">Joined</span>
                        <span className="text-white/50">{new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      {u.phone && (
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-white/20">Phone</span>
                          <span className="text-white/50">{u.phone}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <span className="w-1.5 h-5 bg-gray-500 rounded-full" />
              <h2 className="text-xl font-bold">Platform Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px]">
                <h3 className="font-black text-sm uppercase tracking-widest text-white/30 mb-6">Account Info</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/30 font-bold">Role</span>
                    <span className="text-blue-400 font-black">HANDLER</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/30 font-bold">Access Level</span>
                    <span className="text-emerald-400 font-black">Full Admin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/30 font-bold">Platform</span>
                    <span className="text-white/60 font-black">DigiDukan v1.0</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px] flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest text-white/30 mb-2">Danger Zone</h3>
                  <p className="text-white/20 text-xs mb-6">Actions here are irreversible.</p>
                </div>
                <button onClick={handleLogout} className="w-full py-4 rounded-2xl bg-rose-600/10 border border-rose-500/20 text-rose-400 font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default HandlerDashboard;
