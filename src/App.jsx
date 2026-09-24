import React, { useState, useEffect } from 'react';
import AdminNavbar from './components/AdminNavbar';
import DashboardView from './components/DashboardView';
import OrdersView from './components/OrdersView';
import ProductsView from './components/ProductsView';
import ProductFormModal from './components/ProductFormModal';
import OrderDetailModal from './components/OrderDetailModal';
import {
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

  // Toast message
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Load stats
  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (e) {
      console.error(e);
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
      console.error(e);
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
      console.error(e);
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
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
