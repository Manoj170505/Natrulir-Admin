import React, { useState, useEffect } from 'react';
import AdminNavbar from './components/AdminNavbar';
import DashboardView from './components/DashboardView';
import OrdersView from './components/OrdersView';
import ProductsView from './components/ProductsView';
import ProductFormModal from './components/ProductFormModal';
import OrderDetailModal from './components/OrderDetailModal';
import { AlertTriangle, RefreshCw, Server, ExternalLink } from 'lucide-react';
import {
  API_BASE_URL,
  getDashboardStats,
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  getAdminOrders,
  updateAdminOrderStatus,
  deleteAdminOrder
} from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dashboard stats
  const [stats, setStats] = useState(null);
  
  // Products state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productCategory, setProductCategory] = useState('All');
  
  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  // Connection / Error state
  const [connectionError, setConnectionError] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Load stats
  const loadStats = async () => {
    try {
      setConnectionError('');
      const data = await getDashboardStats();
      if (data) {
        setStats(data);
      }
    } catch (e) {
      console.error('Failed to fetch dashboard stats:', e);
      setConnectionError(e.message || 'Could not connect to backend database.');
    }
  };

  // Load products
  const loadProducts = async () => {
    setProductsLoading(true);
    try {
      const data = await getAdminProducts({
        search: productSearch,
        category: productCategory
      });
      setProducts(data);
    } catch (e) {
      console.error('Failed to fetch products:', e);
      setConnectionError(e.message || 'Could not fetch products from backend.');
    }
    setProductsLoading(false);
  };

  // Load orders
  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await getAdminOrders({
        status: orderStatusFilter,
        search: orderSearch
      });
      setOrders(data);
    } catch (e) {
      console.error('Failed to fetch orders:', e);
      setConnectionError(e.message || 'Could not fetch orders from backend.');
    }
    setOrdersLoading(false);
  };

  // Initial and reactive load
  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'products' || activeTab === 'dashboard') {
      loadProducts();
    }
  }, [productSearch, productCategory, activeTab]);

  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'dashboard') {
      loadOrders();
    }
  }, [orderStatusFilter, orderSearch, activeTab]);

  const handleRefreshAll = () => {
    setConnectionError('');
    loadStats();
    loadProducts();
    loadOrders();
    showToast('✨ Dashboard & Live Data Refreshed');
  };

  // Order status actions
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await updateAdminOrderStatus(orderId, newStatus);
      if (res.success) {
        showToast(`✅ Order status updated to "${newStatus}"`);
        loadOrders();
        loadStats();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(res.data);
        }
      }
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await deleteAdminOrder(orderId);
      showToast('🗑️ Order deleted successfully');
      loadOrders();
      loadStats();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  // Product CRUD actions
  const handleSaveProduct = async (productData) => {
    if (editingProduct) {
      await updateAdminProduct(editingProduct.id, productData);
      showToast('🌿 Product updated successfully');
    } else {
      await createAdminProduct(productData);
      showToast('🌱 New Microgreen Product created!');
    }
    loadProducts();
    loadStats();
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product from the catalog?')) return;
    try {
      await deleteAdminProduct(productId);
      showToast('🗑️ Product deleted');
      loadProducts();
      loadStats();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EE] text-[#1A241B] font-sans flex flex-col">
      
      {/* Navbar */}
      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={handleRefreshAll}
        stats={stats}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Backend Connectivity Banner if error */}
        {connectionError && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-900 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Backend Connection Notice:</strong>
                <p className="mt-0.5 text-[11px] text-amber-800">
                  Target API: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-semibold">{API_BASE_URL}</code>
                </p>
                <p className="mt-1 text-[11px] text-amber-700">
                  {connectionError.includes('IP') || connectionError.includes('Server selection') || connectionError.includes('failed')
                    ? 'MongoDB Atlas requires Network Access whitelist (0.0.0.0/0) to allow cloud servers like Render to connect.'
                    : 'The backend service may be waking up or configuring. Please allow up to 45 seconds and retry.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleRefreshAll}
              className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Connection
            </button>
          </div>
        )}

        {/* Toast Alert */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A27] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn border border-[#A3D977]/30">
            <span>{toast}</span>
          </div>
        )}

        {/* View Switching */}
        {activeTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            onSelectTab={setActiveTab}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onViewOrder={handleViewOrder}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersView
            orders={orders}
            loading={ordersLoading}
            statusFilter={orderStatusFilter}
            setStatusFilter={setOrderStatusFilter}
            searchQuery={orderSearch}
            setSearchQuery={setOrderSearch}
            onUpdateStatus={handleUpdateOrderStatus}
            onViewOrder={handleViewOrder}
            onDeleteOrder={handleDeleteOrder}
          />
        )}

        {activeTab === 'products' && (
          <ProductsView
            products={products}
            loading={productsLoading}
            searchQuery={productSearch}
            setSearchQuery={setProductSearch}
            categoryFilter={productCategory}
            setCategoryFilter={setProductCategory}
            onAddNew={handleOpenAddProduct}
            onEdit={handleOpenEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}

      </main>

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        initialData={editingProduct}
        onSave={handleSaveProduct}
      />

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isOrderDetailOpen}
        onClose={() => setIsOrderDetailOpen(false)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

    </div>
  );
}
