import React from 'react';
import { DollarSign, ShoppingCart, Package, AlertTriangle, TrendingUp, Clock, CheckCircle2, XCircle, ArrowRight, Truck } from 'lucide-react';

export default function DashboardView({ stats, onSelectTab, onUpdateOrderStatus, onViewOrder }) {
  if (!stats) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div>
        <span className="text-xs uppercase tracking-widest font-bold text-[#8C7754]">Overview & Metrics</span>
        <h1 className="font-serif text-3xl font-bold text-[#1E3A27] mt-0.5">Admin Operations Dashboard</h1>
      </div>

      {/* Top 4 Stat Cards matching organic theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-[#EFEAD8] rounded-3xl p-6 border border-[#E2DCB9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Total Sales</span>
            <div className="w-9 h-9 rounded-full bg-[#1E3A27] text-[#A3D977] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl font-bold text-[#1E3A27]">
              ${stats.totalRevenue?.toFixed(2) || '0.00'}
            </span>
            <span className="text-xs text-emerald-800 font-semibold block mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Organic Product Revenue
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-[#EFEAD8] rounded-3xl p-6 border border-[#E2DCB9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Total Orders</span>
            <div className="w-9 h-9 rounded-full bg-[#366D44] text-white flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl font-bold text-[#1E3A27]">
              {stats.totalOrders || 0}
            </span>
            <button
              onClick={() => onSelectTab('orders')}
              className="text-xs text-[#366D44] hover:underline font-semibold block mt-1"
            >
              Manage all customer orders →
            </button>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-[#EFEAD8] rounded-3xl p-6 border border-[#E2DCB9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Live Catalog</span>
            <div className="w-9 h-9 rounded-full bg-[#8C7754] text-white flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl font-bold text-[#1E3A27]">
              {stats.totalProducts || 0}
            </span>
            <span className="text-xs text-stone-600 font-medium block mt-1">
              {stats.totalStock || 0} total units in stock
            </span>
          </div>
        </div>

        {/* Pending Action Required */}
        <div className="bg-[#EFEAD8] rounded-3xl p-6 border border-[#E2DCB9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Pending Orders</span>
            <div className="w-9 h-9 rounded-full bg-[#C86446] text-white flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl font-bold text-[#C86446]">
              {stats.statusCounts?.Pending || 0}
            </span>
            <span className="text-xs text-stone-600 font-medium block mt-1">
              Awaiting harvest & packing
            </span>
          </div>
        </div>

      </div>

      {/* Order Status Distribution Bar */}
      <div className="bg-[#EFEAD8] rounded-3xl p-6 border border-[#E2DCB9]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7754] mb-4">
          Order Status Pipeline
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          
          <div className="bg-white/80 p-4 rounded-2xl border border-stone-200">
            <span className="text-[11px] font-semibold text-stone-500 block">Pending</span>
            <span className="font-serif text-2xl font-bold text-amber-700">
              {stats.statusCounts?.Pending || 0}
            </span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-stone-200">
            <span className="text-[11px] font-semibold text-stone-500 block">Processing</span>
            <span className="font-serif text-2xl font-bold text-blue-700">
              {stats.statusCounts?.Processing || 0}
            </span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-blue-200 bg-blue-50/50">
            <span className="text-[11px] font-semibold text-blue-800 block">Order Picked</span>
            <span className="font-serif text-2xl font-bold text-blue-900">
              {stats.statusCounts?.['Order Picked'] || 0}
            </span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50">
            <span className="text-[11px] font-semibold text-emerald-800 block">Delivered</span>
            <span className="font-serif text-2xl font-bold text-emerald-900">
              {stats.statusCounts?.Delivered || 0}
            </span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-rose-200 bg-rose-50/50">
            <span className="text-[11px] font-semibold text-rose-800 block">Denied / Cancelled</span>
            <span className="font-serif text-2xl font-bold text-rose-900">
              {stats.statusCounts?.Denied || 0}
            </span>
          </div>

        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[#EFEAD8] rounded-3xl p-6 sm:p-8 border border-[#E2DCB9]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1E3A27]">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-stone-600">Quickly change status as Order Picked or Denied</p>
          </div>
          <button
            onClick={() => onSelectTab('orders')}
            className="text-xs font-semibold text-[#1E3A27] hover:text-[#366D44] flex items-center gap-1 bg-white/70 px-3 py-1.5 rounded-full shadow-xs"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-300 text-stone-600 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80">
              {stats.recentOrders?.map((order) => (
                <tr key={order.id} className="hover:bg-white/50 transition">
                  <td className="py-4 font-bold text-[#1E3A27]">
                    <button
                      onClick={() => onViewOrder(order)}
                      className="hover:underline text-[#366D44]"
                    >
                      {order.orderNumber}
                    </button>
                  </td>
                  <td className="py-4">
                    <div className="font-semibold text-stone-800">{order.customerName}</div>
                    <div className="text-[10px] text-stone-500">{order.city} • {order.customerPhone}</div>
                  </td>
                  <td className="py-4">
                    <span className="text-stone-700">
                      {order.items?.length || 0} items ({order.items?.map(i => i.productName).join(', ').slice(0, 24)}...)
                    </span>
                  </td>
                  <td className="py-4 font-serif font-bold text-[#1E3A27]">
                    ${order.totalAmount?.toFixed(2)}
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      order.status === 'Order Picked'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Denied'
                        ? 'bg-rose-100 text-rose-800'
                        : order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'Processing'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'Order Picked')}
                        disabled={order.status === 'Order Picked'}
                        className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white rounded-lg text-[11px] font-semibold transition"
                        title="Mark as Picked & Dispatched"
                      >
                        Pick Order
                      </button>
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'Denied')}
                        disabled={order.status === 'Denied'}
                        className="px-2.5 py-1 bg-rose-700 hover:bg-rose-800 disabled:opacity-40 text-white rounded-lg text-[11px] font-semibold transition"
                        title="Deny / Cancel Order"
                      >
                        Deny
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
