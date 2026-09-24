import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Package, Star, AlertTriangle, Eye } from 'lucide-react';

const CATEGORIES = ['All', 'Live Microgreens', 'Grow Kits', 'Organic Seeds', 'Superfood Blends', 'Accessories'];

export default function ProductsView({
  products,
  loading,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  onAddNew,
  onEdit,
  onDelete
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#8C7754]">Inventory & Store Catalog</span>
          <h1 className="font-serif text-3xl font-bold text-[#1E3A27]">Microgreen Products</h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Add new living products, update prices, adjust stock levels, and assign promotional badges.
          </p>
        </div>

        <button
          onClick={onAddNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3A27] hover:bg-[#2B5737] text-white text-xs font-semibold shadow-md transition transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 text-[#A3D977]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === cat
                  ? 'bg-[#1E3A27] text-white shadow'
                  : 'bg-[#EFEAD8] hover:bg-[#E4DDCA] text-[#2B332C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search products by title or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white rounded-full border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#366D44]"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#EFEAD8] rounded-3xl p-6 border border-[#E2DCB9] shadow-xs">
        {loading ? (
          <div className="py-12 text-center text-xs text-stone-500 animate-pulse">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-2" />
            <h3 className="font-serif text-lg font-bold text-[#1E3A27]">No Products Found</h3>
            <p className="text-xs text-stone-500 mt-1">Try resetting your search or add a new microgreen product.</p>
            <button
              onClick={onAddNew}
              className="mt-4 px-4 py-2 rounded-full bg-[#1E3A27] text-white text-xs font-semibold"
            >
              + Create Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-300 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Stock Units</th>
                  <th className="pb-3">Badge</th>
                  <th className="pb-3">Harvest Cycle</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/40 transition">
                    
                    {/* Image & Title */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-stone-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-[#1E3A27] line-clamp-1">{product.name}</h4>
                          <span className="text-[10px] text-stone-500 line-clamp-1">{product.tagline || product.tasteProfile}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5">
                      <span className="bg-white/80 text-[#2B332C] px-2.5 py-1 rounded-full text-[11px] font-medium border border-stone-200">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 font-serif font-bold text-[#1E3A27]">
                      ${parseFloat(product.price).toFixed(2)}
                      {product.originalPrice && (
                        <span className="text-[10px] text-stone-400 line-through block font-sans font-normal">
                          ${parseFloat(product.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        product.stock < 15
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {product.stock < 15 && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                        {product.stock} units
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="py-3.5">
                      {product.badge ? (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#1E3A27] text-[#A3D977]">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Harvest Cycle */}
                    <td className="py-3.5 text-stone-600 text-[11px]">
                      {product.harvestTime || 'Harvested Daily'}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEdit(product)}
                          className="p-1.5 rounded-lg bg-white hover:bg-[#1E3A27] text-stone-700 hover:text-white transition shadow-xs"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="p-1.5 rounded-lg bg-white hover:bg-rose-600 text-stone-400 hover:text-white transition shadow-xs"
                          title="Delete Product"
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
