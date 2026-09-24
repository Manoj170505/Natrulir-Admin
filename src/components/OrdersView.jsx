import React, { useState } from 'react';
import { Search, ShoppingCart, CheckCircle2, XCircle, Clock, Truck, Eye, Trash2, Filter } from 'lucide-react';

const STATUSES = ['All', 'Pending', 'Processing', 'Order Picked', 'Denied', 'Delivered'];

export default function OrdersView({
  orders,
  loading,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  onUpdateStatus,
  onViewOrder,
  onDeleteOrder
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Order Picked':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Denied':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-stone-200 text-stone-800 border-stone-300';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#8C7754]">Customer Operations</span>
          <h1 className="font-serif text-3xl font-bold text-[#1E3A27]">Order Management</h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Review incoming orders, process live harvests, and update status as <strong>Order Picked</strong> or <strong>Denied</strong>.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by ID, name, city, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-white rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#366D44]"
          />
        </div>
      </div>

      {/* Filter Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-300">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              statusFilter === status
                ? 'bg-[#1E3A27] text-white shadow'
                : 'bg-[#EFEAD8] hover:bg-[#E4DDCA] text-[#2B332C]'
            }`}
          >
            {status} {status === 'All' ? `(${orders.length})` : ''}
          </button>
        ))}
      </div>

      {/* Orders Table Container */}
      <div className="bg-[#EFEAD8] rounded-3xl p-6 border border-[#E2DCB9] shadow-xs">
        {loading ? (
          <div className="py-12 text-center text-xs text-stone-500 animate-pulse">
            Loading customer orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-12 h-12 text-stone-300 mx-auto mb-2" />
            <h3 className="font-serif text-lg font-bold text-[#1E3A27]">No Orders Found</h3>
            <p className="text-xs text-stone-500 mt-1">No customer orders matching the current filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-300 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Order Number</th>
                  <th className="pb-3">Customer & Delivery</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Current Status</th>
                  <th className="pb-3 text-center">Update Order Status</th>
                  <th className="pb-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/40 transition">
                    
                    {/* Order Number & Date */}
                    <td className="py-4 align-top">
                      <button
                        onClick={() => onViewOrder(order)}
                        className="font-bold text-[#1E3A27] hover:text-[#366D44] hover:underline block text-xs"
                      >
                        {order.orderNumber}
                      </button>
                      <span className="text-[10px] text-stone-500 block mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className="text-[10px] text-stone-500 bg-white/70 px-2 py-0.5 rounded-full inline-block mt-1">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="py-4 align-top">
                      <div className="font-bold text-[#1E3A27]">{order.customerName}</div>
                      <div className="text-[11px] text-stone-600">{order.customerPhone}</div>
                      <div className="text-[10px] text-stone-500 line-clamp-1 max-w-xs mt-0.5">
                        {order.shippingAddress}, {order.city}
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-4 align-top">
                      <div className="space-y-1 max-w-xs">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-700">
                            <span className="font-semibold text-emerald-800">{item.quantity}x</span>
                            <span className="line-clamp-1">{item.productName}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 align-top font-serif font-bold text-sm text-[#1E3A27]">
                      ${order.totalAmount?.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 align-top">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(order.status)}`}>
                        {order.status === 'Order Picked' ? '📦 Order Picked' : order.status}
                      </span>
                    </td>

                    {/* Fast Status Change Actions */}
                    <td className="py-4 align-top text-center">
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        
                        {/* Order Picked Action */}
                        <button
                          onClick={() => onUpdateStatus(order.id, 'Order Picked')}
                          disabled={order.status === 'Order Picked'}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition flex items-center gap-1 shadow-xs ${
                            order.status === 'Order Picked'
                              ? 'bg-blue-200 text-blue-900 opacity-60 cursor-not-allowed'
                              : 'bg-blue-700 hover:bg-blue-800 text-white'
                          }`}
                          title="Mark order as picked and dispatched"
                        >
                          <Truck className="w-3 h-3" />
                          <span>Order Picked</span>
                        </button>

                        {/* Denied Action */}
                        <button
                          onClick={() => onUpdateStatus(order.id, 'Denied')}
                          disabled={order.status === 'Denied'}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition flex items-center gap-1 shadow-xs ${
                            order.status === 'Denied'
                              ? 'bg-rose-200 text-rose-900 opacity-60 cursor-not-allowed'
                              : 'bg-rose-700 hover:bg-rose-800 text-white'
                          }`}
                          title="Deny / Cancel order"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Denied</span>
                        </button>

                        {/* More Status Switcher Dropdown */}
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                          className="bg-white text-[11px] font-semibold text-stone-700 border border-stone-300 rounded-full px-2 py-1 focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Order Picked">Order Picked</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Denied">Denied</option>
                        </select>
                      </div>
                    </td>

                    {/* View Details & Delete */}
                    <td className="py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewOrder(order)}
                          className="p-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 transition"
                          title="View Full Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteOrder(order.id)}
                          className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-stone-400 hover:text-red-600 transition"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
