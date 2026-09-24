import React from 'react';
import { X, Truck, XCircle, CheckCircle2, Clock, MapPin, Phone, Mail, FileText, CreditCard } from 'lucide-react';

export default function OrderDetailModal({ order, isOpen, onClose, onUpdateStatus }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#F7F5EE] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#EFEAD8] border-b border-stone-300 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl font-bold text-[#1E3A27]">
                Order #{order.orderNumber}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                order.status === 'Order Picked'
                  ? 'bg-blue-100 text-blue-800'
                  : order.status === 'Denied'
                  ? 'bg-rose-100 text-rose-800'
                  : order.status === 'Delivered'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-black transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Status Bar */}
          <div className="p-4 bg-white/80 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-stone-700">Change Status:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onUpdateStatus(order.id, 'Pending')}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Pending' ? 'bg-[#1E3A27] text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
              >
                Pending
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'Processing')}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Processing' ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
              >
                Processing
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'Order Picked')}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Order Picked' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
              >
                📦 Order Picked
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'Delivered')}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
              >
                Delivered
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'Denied')}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Denied' ? 'bg-rose-700 text-white' : 'bg-rose-100 text-rose-800 hover:bg-rose-200'}`}
              >
                🚫 Denied
              </button>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#EFEAD8] p-4 rounded-2xl border border-stone-300 text-xs space-y-2">
              <h4 className="font-bold text-[#1E3A27] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-800" /> Customer Information
              </h4>
              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.customerEmail}</p>
              <p><strong>Phone:</strong> {order.customerPhone}</p>
              <p><strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus || 'Pending'})</p>
            </div>

            <div className="bg-[#EFEAD8] p-4 rounded-2xl border border-stone-300 text-xs space-y-2">
              <h4 className="font-bold text-[#1E3A27] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-800" /> Shipping Destination
              </h4>
              <p><strong>Street:</strong> {order.shippingAddress}</p>
              <p><strong>City/State:</strong> {order.city} {order.state} {order.postalCode}</p>
              {order.notes && (
                <p className="italic text-stone-600 bg-white/60 p-1.5 rounded">
                  <strong>Notes:</strong> "{order.notes}"
                </p>
              )}
            </div>
          </div>

          {/* Ordered Products Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7754]">
              Ordered Items ({order.items?.length || 0})
            </h4>
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-stone-200">
                  <div className="flex items-center gap-3">
                    {item.productImage && (
                      <img src={item.productImage} alt={item.productName} className="w-12 h-12 rounded-lg object-cover bg-stone-100" />
                    )}
                    <div>
                      <h5 className="text-xs font-bold text-[#1E3A27]">{item.productName}</h5>
                      <span className="text-[11px] text-stone-500">
                        {item.category} • ${item.price?.toFixed(2)} each
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-600 block">Qty: {item.quantity}</span>
                    <span className="font-serif font-bold text-xs text-[#1E3A27]">
                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Totals */}
          <div className="p-4 bg-[#EFEAD8] rounded-2xl border border-stone-300 text-xs space-y-1.5">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span>${order.subtotal?.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Discount Applied:</span>
                <span>-${order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Shipping Fee:</span>
              <span>${order.shippingFee?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#1E3A27] border-t border-stone-300 pt-2">
              <span>Total Invoice:</span>
              <span className="font-serif text-base">${order.totalAmount?.toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
