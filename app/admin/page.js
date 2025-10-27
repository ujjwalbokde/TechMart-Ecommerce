'use client'

import { useState, useEffect } from 'react'

export default function Admin() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: '',
    inventory: ''
  })
  const [message, setMessage] = useState('')
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    
    const productData = {
      ...form,
      price: parseFloat(form.price),
      inventory: parseInt(form.inventory),
      lastUpdated: new Date().toISOString()
    }

    try {
      if (editId) {
        await fetch(`/api/products/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-api-key': 'your-secret-key' },
          body: JSON.stringify(productData)
        })
        setMessage('✓ Product updated successfully!')
      } else {
        productData.id = Date.now().toString()
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': 'your-secret-key' },
          body: JSON.stringify(productData)
        })
        setMessage('✓ Product added successfully!')
      }

      setForm({ name: '', slug: '', description: '', price: '', category: '', inventory: '' })
      setEditId(null)
      fetchProducts()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('✗ Error: Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(product) {
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      inventory: product.inventory.toString()
    })
    setEditId(product.id)
  }

  function handleCancel() {
    setEditId(null)
    setForm({ name: '', slug: '', description: '', price: '', category: '', inventory: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-lg text-gray-600">Manage your product catalog</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 px-6 py-4 rounded-lg flex items-center justify-between shadow-sm ${
            message.includes('✓') 
              ? 'bg-green-50 border-l-4 border-green-500 text-green-800' 
              : 'bg-red-50 border-l-4 border-red-500 text-red-800'
          }`}>
            <span className="font-medium">{message}</span>
            <button onClick={() => setMessage('')} className="text-xl font-bold hover:opacity-70">
              ×
            </button>
          </div>
        )}

        {/* Side by Side Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* LEFT SIDE - Add/Edit Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-fit sticky top-4">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <h2 className="text-xl font-bold text-gray-900">
                {editId ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              {editId && (
                <p className="text-xs text-gray-600 mt-1">Editing ID: {editId}</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g., iPhone 15 Pro"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Slug (URL-friendly) *
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                  placeholder="e.g., iphone-15-pro"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows="3"
                  placeholder="Describe your product..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
                />
              </div>

              {/* Price & Inventory Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 text-sm font-medium">₹</span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Stock *
                  </label>
                  <input
                    type="number"
                    value={form.inventory}
                    onChange={(e) => setForm({ ...form, inventory: e.target.value })}
                    required
                    min="0"
                    placeholder="0"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Category *
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  placeholder="e.g., phones, laptops"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? '⏳ Processing...' : (editId ? '💾 Update' : '➕ Add Product')}
                </button>
                
                {editId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition shadow-sm text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT SIDE - Products Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Product Inventory</h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Total: {products.length} products
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[800px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-12 text-center text-gray-500">
                        <div className="text-5xl mb-3">📦</div>
                        <p className="text-base font-medium">No products yet</p>
                        <p className="text-xs">Add your first product</p>
                      </td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id} className="hover:bg-blue-50 transition">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-gray-900 text-sm">
                            ₹{product.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                            product.inventory < 10
                              ? 'bg-red-100 text-red-800'
                              : product.inventory < 20
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {product.inventory}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleEdit(product)}
                            className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition shadow-sm"
                          >
                            ✏️ Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
