import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image, Check, Plus, AlertCircle, Eye } from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'Sunflower Tray', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80' },
  { name: 'Purple Radish', url: 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Broccoli Shoots', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tendril Pea Shoots', url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ceramic Grow Kit', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80' },
  { name: 'Heirloom Seeds', url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Super Powder', url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80' },
  { name: 'Amber Mister', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80' }
];

const CATEGORIES = ['Live Microgreens', 'Grow Kits', 'Organic Seeds', 'Superfood Blends', 'Accessories'];
const BADGES = ['None', 'Bestseller', 'Promotion', 'Superfood', 'Customer favorite', 'New'];

export default function ProductFormModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Live Microgreens',
    image: PRESET_IMAGES[0].url,
    badge: 'New',
    stock: '50',
    harvestTime: 'Harvested Daily',
    nutrition: 'Sulforaphane, Vitamin C, Zinc, Plant Protein',
    tasteProfile: 'Fresh, Crisp & Peppery',
    weight: '150g Living Tray',
    featured: true
  });

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        tagline: initialData.tagline || '',
        description: initialData.description || '',
        price: initialData.price ? String(initialData.price) : '',
        originalPrice: initialData.originalPrice ? String(initialData.originalPrice) : '',
        category: initialData.category || 'Live Microgreens',
        image: initialData.image || PRESET_IMAGES[0].url,
        badge: initialData.badge || 'None',
        stock: initialData.stock !== undefined ? String(initialData.stock) : '50',
        harvestTime: initialData.harvestTime || 'Harvested Daily',
        nutrition: Array.isArray(initialData.nutrition) ? initialData.nutrition.join(', ') : (initialData.nutrition || ''),
        tasteProfile: initialData.tasteProfile || '',
        weight: initialData.weight || '',
        featured: Boolean(initialData.featured)
      });
    } else {
      setFormData({
        name: '',
        tagline: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Live Microgreens',
        image: PRESET_IMAGES[0].url,
        badge: 'New',
        stock: '50',
        harvestTime: 'Harvested Daily',
        nutrition: 'Sulforaphane, Vitamin C, Zinc, Plant Protein',
        tasteProfile: 'Fresh, Crisp & Peppery',
        weight: '150g Living Tray',
        featured: true
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.price || !formData.image) {
      setError('Product Name, Price, and Image URL are required.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        category: formData.category,
        image: formData.image,
        badge: formData.badge === 'None' ? null : formData.badge,
        stock: parseInt(formData.stock, 10) || 0,
        harvestTime: formData.harvestTime,
        nutrition: formData.nutrition.split(',').map(s => s.trim()).filter(Boolean),
        tasteProfile: formData.tasteProfile,
        weight: formData.weight,
        featured: formData.featured
      };

      await onSave(payload);
      setSaving(false);
      onClose();
    } catch (err) {
      setSaving(false);
      setError(err.message || 'Error saving product');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#F7F5EE] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#EFEAD8] border-b border-stone-300 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1E3A27]">
              {initialData ? 'Edit Microgreen Product' : 'Add New Microgreen Product'}
            </h2>
            <p className="text-xs text-stone-600">
              Configure product details, organic properties, pricing and inventory.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-black transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body with Live Preview Split */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Form (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
            {error && (
              <div className="p-3 bg-red-100 text-red-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name & Tagline */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Crimson Kohlrabi Living Shoots"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#366D44]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Subtitle / Tagline
              </label>
              <input
                type="text"
                name="tagline"
                placeholder="e.g. Sweet, mild cabbage flavor with intense anthocyanin antioxidants"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#366D44]"
              />
            </div>

            {/* Category & Badge */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#366D44]"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Display Badge
                </label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#366D44]"
                >
                  {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Price, Original Price & Stock */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  required
                  placeholder="6.99"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#366D44]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="originalPrice"
                  placeholder="8.50"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#366D44]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Stock Units
                </label>
                <input
                  type="number"
                  name="stock"
                  placeholder="50"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:ring-1 focus:ring-[#366D44]"
                />
              </div>
            </div>

            {/* Harvest Time, Taste Profile, Weight */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Harvest / Grow Time
                </label>
                <input
                  type="text"
                  name="harvestTime"
                  placeholder="Harvested Daily"
                  value={formData.harvestTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Taste Profile
                </label>
                <input
                  type="text"
                  name="tasteProfile"
                  placeholder="Nutty & crunchy"
                  value={formData.tasteProfile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Weight / Tray Size
                </label>
                <input
                  type="text"
                  name="weight"
                  placeholder="150g Live Tray"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300"
                />
              </div>
            </div>

            {/* Nutritional Tags */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Nutritional Highlights (Comma-separated)
              </label>
              <input
                type="text"
                name="nutrition"
                placeholder="Sulforaphane, Vitamin C, Zinc, Plant Protein"
                value={formData.nutrition}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300"
              />
            </div>

            {/* Image URL & Preset Selection */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Product Image URL *
              </label>
              <input
                type="url"
                name="image"
                required
                placeholder="https://..."
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 mb-2"
              />

              {/* Quick Pick Photo Presets */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-stone-500 font-semibold mr-1">Presets:</span>
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFEAD8] hover:bg-[#E4DDCA] text-stone-700 font-medium border border-stone-300/80"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Full Description
              </label>
              <textarea
                name="description"
                rows="3"
                placeholder="Detailed description of microgreen flavor, growing techniques, and health benefits..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-full bg-[#1E3A27] hover:bg-[#2B5737] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                {saving ? 'Saving Product...' : (initialData ? 'Update Microgreen Product' : 'Add Living Product to Store')}
              </button>
            </div>
          </form>

          {/* Right: Live Customer Card Preview (5 cols) */}
          <div className="lg:col-span-5 bg-[#EFEAD8] rounded-3xl p-6 border border-stone-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7754] flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Customer Card Preview
                </span>
                <span className="text-[10px] text-stone-500 bg-white/60 px-2 py-0.5 rounded-full">
                  Live View
                </span>
              </div>

              {/* Mock Card */}
              <div className="bg-[#FAF8F2] rounded-2xl p-4 border border-stone-300/80 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  {formData.badge && formData.badge !== 'None' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E3A27] text-[#A3D977]">
                      {formData.badge}
                    </span>
                  ) : <div />}
                  <span className="text-[10px] text-stone-500">{formData.category}</span>
                </div>

                <div className="aspect-square rounded-xl overflow-hidden bg-stone-200 mb-3">
                  <img
                    src={formData.image || PRESET_IMAGES[0].url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = PRESET_IMAGES[0].url; }}
                  />
                </div>

                <h4 className="font-serif text-base font-bold text-[#1E3A27] line-clamp-1">
                  {formData.name || 'Product Title'}
                </h4>
                <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
                  {formData.tagline || 'Nutritious living tray'}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-200">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-bold text-sm text-[#1E3A27]">
                      ${parseFloat(formData.price || 0).toFixed(2)}
                    </span>
                    {formData.originalPrice && (
                      <span className="text-[10px] text-stone-400 line-through">
                        ${parseFloat(formData.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold bg-[#1E3A27] text-white px-3 py-1 rounded-full">
                    + Cart
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/70 rounded-xl text-[11px] text-stone-600 space-y-1">
              <div><strong>Stock:</strong> {formData.stock} trays available</div>
              <div><strong>Nutrition:</strong> {formData.nutrition || 'None'}</div>
              <div><strong>Harvest Time:</strong> {formData.harvestTime}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
