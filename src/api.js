export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://natrulir-backend.onrender.com/api';

export const getDashboardStats = async () => {
  const res = await fetch(`${API_BASE_URL}/stats/dashboard`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  const data = await res.json();
  return data.data;
};

export const getAdminProducts = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.append('category', params.category);
  if (params.search) query.append('search', params.search);
  if (params.sort) query.append('sort', params.sort);

  const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.data || [];
};

export const createAdminProduct = async (productData) => {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to create product' }));
    throw new Error(err.message || 'Failed to create product');
  }
  return await res.json();
};

export const updateAdminProduct = async (id, productData) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to update product' }));
    throw new Error(err.message || 'Failed to update product');
  }
  return await res.json();
};

export const deleteAdminProduct = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return await res.json();
};

export const getAdminOrders = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.status && params.status !== 'All') query.append('status', params.status);
  if (params.search) query.append('search', params.search);

  const res = await fetch(`${API_BASE_URL}/orders?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  const data = await res.json();
  return data.data || [];
};

export const updateAdminOrderStatus = async (orderId, status) => {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to update order status' }));
    throw new Error(err.message || 'Failed to update order status');
  }
  return await res.json();
};

export const deleteAdminOrder = async (orderId) => {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete order');
  return await res.json();
};
