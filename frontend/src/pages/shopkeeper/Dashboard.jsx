import SEO from '../../components/common/SEO';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LayoutDashboard, Store, Package, MessageSquare, BarChart3, Settings, ExternalLink, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/v1`;

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${API_URL}/shops`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setShops(response.data.data.shops);
      } catch (error) {
        console.error('Error fetching shops', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" style={{ backgroundColor: '#f9fafb' }}>
      <SEO
        title="My Dashboard | DigiDukan — Shopkeeper Portal"
        description="Manage your DigiDukan digital store — view orders, update products, track visitors, and grow your local business online."
        keywords="digidukan dashboard, manage online shop, shopkeeper portal, digital dukan management"
        noIndex={true}
      />

      {/* Top Navbar */}
      <nav className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm" style={{ backgroundColor: 'white' }}>
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-display font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>DigiDukan</div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="text-gray-500 font-medium">Shopkeeper Portal</div>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/create-store" className="bg-gray-900 text-white py-2.5 px-6 rounded-xl text-sm font-bold shadow-lg flex items-center space-x-2" style={{ backgroundColor: '#111827' }}>
            <Plus size={18} />
            <span>Create Store</span>
          </Link>
          <div className="flex items-center space-x-3 border-l pl-6">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
              {user?.name?.[0] || 'U'}
            </div>
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-display font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Namaste, {user?.name?.split(' ')[0] || 'Dost'}!</h1>
            <p className="text-gray-500 mt-1">Manage your digital dukans and products efficiently.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active Plan</p>
            <p className="font-bold text-blue-600">Free Lifetime</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Visitors', value: '1,284', icon: BarChart3, color: '#3b82f6', bg: '#eff6ff' },
            { label: 'Total Products', value: '24', icon: Package, color: '#8b5cf6', bg: '#f5f3ff' },
            { label: 'Active Shops', value: shops.length, icon: Store, color: '#10b981', bg: '#ecfdf5' },
            { label: 'New Queries', value: '12', icon: MessageSquare, color: '#f59e0b', bg: '#fffbeb' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center space-x-6"
            >
              <div className="p-4 rounded-2xl" style={{ backgroundColor: stat.bg, color: stat.color }}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shops List */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h2 className="text-2xl font-bold text-gray-900">Your Digital Stores</h2>
            <button className="text-blue-600 font-bold text-sm hover:underline">View All Requests</button>
          </div>
          <div className="p-0">
            {loading ? (
              <div className="p-20 text-center text-gray-400">Loading your stores...</div>
            ) : shops.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <Store size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Build your first store</h3>
                <p className="text-gray-500 mb-10 max-w-sm mx-auto">Create a beautiful online presence for your business in just 2 minutes.</p>
                <Link to="/create-store" className="bg-gray-900 text-white py-4 px-10 rounded-2xl font-bold shadow-xl inline-flex items-center space-x-2" style={{ backgroundColor: '#111827' }}>
                   <Plus size={20} />
                   <span>Start Creation</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {shops.map((shop) => (
                  <div key={shop._id} className="p-10 flex items-center justify-between hover:bg-gray-50 transition-all group">
                    <div className="flex items-center space-x-8">
                      <div className="w-20 h-20 bg-gray-100 rounded-3xl overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center">
                        {shop.logo ? (
                          <img src={shop.logo} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <Store size={32} className="text-gray-300" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-2xl mb-1">{shop.name}</h3>
                        <div className="flex items-center space-x-4">
                          <span className={`px-4 py-1 rounded-full text-xs font-bold tracking-widest ${shop.status === 'LIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {shop.status}
                          </span>
                          <span className="text-sm text-gray-400 font-bold uppercase">{shop.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link to={`/store/${shop.slug}`} target="_blank" className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-gray-100">
                        <ExternalLink size={20} />
                      </Link>
                      <button className="px-8 py-3 bg-white border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-900 hover:border-gray-900 transition-all shadow-sm">
                        Manage Store
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
