import SEO from '../../components/common/SEO';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Store, Package, MessageSquare, BarChart3, ExternalLink, Plus, Layout, Settings, LogOut, Menu, X, Smartphone, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/v1`;

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [stats, setStats] = useState({ totalShops: 0, totalProducts: 0, totalVisitors: 0, newQueries: 0 });
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shopsRes, statsRes] = await Promise.all([
          axios.get(`${API_URL}/shops`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/shops/analytics`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        setShops(shopsRes.data.data.shops);
        setStats(statsRes.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const navItems = [
    { name: 'Overview', icon: Layout, path: '/dashboard' },
    { name: 'My Shops', icon: Store, path: '/dashboard' },
    { name: 'Products', icon: Package, path: '/dashboard' },
    { name: 'Settings', icon: Settings, path: '/dashboard' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
      <SEO
        title="My Dashboard | DigiDukan — Shopkeeper Portal"
        description="Manage your DigiDukan digital store — view orders, update products, track visitors, and grow your local business online."
        keywords="digidukan dashboard, manage online shop, shopkeeper portal, digital dukan management"
        noIndex={true}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <Link to="/" className="flex items-center space-x-2 mb-12">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">D</div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">DigiDukan</span>
          </Link>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`flex items-center space-x-3 p-4 rounded-2xl font-bold transition-all ${
                  item.name === 'Overview' ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-gray-50">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-gray-900 truncate">{user?.name || 'Shopkeeper'}</p>
              <p className="text-xs text-gray-400 font-bold uppercase truncate">{user?.role}</p>
            </div>
          </div>
          <button className="flex items-center space-x-3 w-full p-4 rounded-2xl font-bold text-red-600 hover:bg-red-50 transition-all">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-40">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold">D</div>
          <span className="font-bold text-lg">DigiDukan</span>
        </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 h-16 flex items-center justify-between z-50">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path} className="flex flex-col items-center justify-center space-y-1">
            <item.icon size={20} className={item.name === 'Overview' ? 'text-gray-900' : 'text-gray-400'} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${item.name === 'Overview' ? 'text-gray-900' : 'text-gray-400'}`}>
              {item.name === 'Overview' ? 'Home' : item.name.split(' ')[0]}
            </span>
          </Link>
        ))}
        <Link to="/create-store" className="bg-gray-900 text-white p-3 rounded-2xl -mt-12 shadow-xl shadow-gray-200 border-4 border-white">
          <Plus size={24} />
        </Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 lg:h-screen lg:overflow-y-auto pb-20 lg:pb-0">
        {/* Desktop Top Nav */}
        <div className="hidden lg:flex h-20 bg-white border-b border-gray-100 items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
            <div className="h-4 w-px bg-gray-200" />
            <div className="text-gray-400 font-bold uppercase text-xs tracking-widest">Shopkeeper Portal</div>
          </div>
          <Link to="/create-store" className="btn-primary !py-2.5">
            <Plus size={18} />
            <span>Create Store</span>
          </Link>
        </div>

        <div className="p-4 sm:p-6 lg:p-10 container-custom max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Namaste, {user?.name?.split(' ')[0] || 'Dost'}!</h1>
              <p className="text-gray-500 mt-1">Grow your business with DigiDukan.</p>
            </div>
            <div className="bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl border border-gray-100 shadow-sm text-center sm:text-right w-full sm:w-auto">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Plan</p>
              <p className="font-bold text-blue-600">Free Lifetime</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              { label: 'Visitors', value: stats.totalVisitors, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Products', value: stats.totalProducts, icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Shops', value: stats.totalShops, icon: Store, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Queries', value: stats.newQueries, icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center space-x-6"
              >
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Shops List */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="p-6 sm:p-8 lg:p-10 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Digital Stores</h2>
              <Link to="/create-store" className="lg:hidden btn-primary !py-2.5 !w-full sm:!w-auto">
                <Plus size={18} />
                <span>Add Store</span>
              </Link>
            </div>
            
            <div className="p-4 sm:p-0">
              {loading ? (
                <div className="p-20 text-center text-gray-400 flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                  <span className="font-bold">Loading your stores...</span>
                </div>
              ) : shops.length === 0 ? (
                <div className="p-12 sm:p-20 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                    <Store size={40} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Build your first store</h3>
                  <p className="text-gray-500 mb-8 max-w-sm mx-auto">Create a beautiful online presence for your business in just 2 minutes.</p>
                  <Link to="/create-store" className="btn-primary">
                     <Plus size={20} />
                     <span>Start Creation</span>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {shops.map((shop) => (
                    <div key={shop._id} className="p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-gray-50 transition-all group">
                      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full sm:w-auto">
                        <div className="w-20 h-20 bg-gray-100 rounded-3xl overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center shrink-0">
                          {shop.logo ? (
                            <img src={shop.logo} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <Store size={32} className="text-gray-300" />
                          )}
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="font-bold text-gray-900 text-xl sm:text-2xl mb-2">{shop.name}</h3>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              shop.status === 'LIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {shop.status}
                            </span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{shop.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link to={`/store/${shop.slug}`} target="_blank" className="flex-1 sm:flex-none w-12 h-12 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all border border-gray-100">
                          <ExternalLink size={20} />
                        </Link>
                        <button className="flex-[3] sm:flex-none px-6 sm:px-8 py-3 bg-white border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-900 hover:border-gray-900 transition-all shadow-sm whitespace-nowrap">
                          Manage Store
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
