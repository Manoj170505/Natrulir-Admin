import React from 'react';
import { Leaf, LayoutDashboard, Package, ShoppingCart, ExternalLink, RefreshCw } from 'lucide-react';

export default function AdminNavbar({ activeTab, setActiveTab, onRefresh, stats }) {
  return (
    <header className="bg-[#1E3A27] text-white border-b border-[#2B5737] sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#A3D977] text-[#1E3A27] flex items-center justify-center font-bold shadow-md">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block leading-tight">
                  Natrulir <span className="text-[#A3D977] italic font-normal">Admin</span>
                </span>
                <span className="text-[10px] text-stone-300 uppercase tracking-widest font-semibold">
                  Microgreens Management Hub
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-2 ml-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition ${
                  activeTab === 'dashboard'
                    ? 'bg-[#A3D977] text-[#1E3A27] shadow'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition relative ${
                  activeTab === 'orders'
                    ? 'bg-[#A3D977] text-[#1E3A27] shadow'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Customer Orders</span>
                {stats?.statusCounts?.Pending > 0 && (
                  <span className="bg-[#C86446] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {stats.statusCounts.Pending}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition ${
                  activeTab === 'products'
                    ? 'bg-[#A3D977] text-[#1E3A27] shadow'
                    : 'text-stone-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Products & Stock</span>
              </button>
            </nav>
          </div>

          {/* Right Actions: Refresh & Customer Storefront Link */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 transition"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EFEAD8] hover:bg-white text-[#1E3A27] text-xs font-semibold shadow transition"
            >
              <span>View Customer Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Mobile Nav Tabs */}
        <div className="flex md:hidden items-center justify-around pb-3 border-t border-white/10 pt-2 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'dashboard' ? 'bg-[#A3D977] text-[#1E3A27] font-bold' : 'text-stone-300'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'orders' ? 'bg-[#A3D977] text-[#1E3A27] font-bold' : 'text-stone-300'}`}
          >
            Orders ({stats?.statusCounts?.Pending || 0})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'products' ? 'bg-[#A3D977] text-[#1E3A27] font-bold' : 'text-stone-300'}`}
          >
            Products
          </button>
        </div>
      </div>
    </header>
  );
}
