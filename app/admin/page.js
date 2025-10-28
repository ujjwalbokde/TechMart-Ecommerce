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
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
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
        await fetch(`${baseURL}/api/products/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-api-key': 'your-secret-key' },
          body: JSON.stringify(productData)
        })
        setMessage('✓ Product updated successfully!')
      } else {
        productData.id = Date.now().toString()
        await fetch(`${baseURL}/api/products`, {
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
    } catch {
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
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">Admin Panel</h1>
          <p className="text-base sm:text-lg text-gray-600">Manage your product catalog</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-5 px-4 py-3 sm:px-6 sm:py-4 rounded-lg flex items-center justify-between shadow-sm text-sm sm:text-base ${
            message.includes('✓') 
              ? 'bg-green-50 border-l-4 border-green-500 text-green-800' 
              : 'bg-red-50 border-l-4 border-red-500 text-red-800'
          }`}>
            <span className="font-medium">{message}</span>
            <button onClick={() => setMessage('')} className="text-lg font-bold hover:opacity-70">
              ×
            </button>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-fit top-4">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {editId ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              {editId && (
                <p className="text-xs text-gray-600 mt-1">Editing ID: {editId}</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              {/* Fields */}
              {[
                ['Product Name *', 'name', 'e.g., iPhone 15 Pro'],
                ['Slug (URL-friendly) *', 'slug', 'e.g., iphone-15-pro'],
                ['Description *', 'description', 'Describe your product...'],
                ['Category *', 'category', 'e.g., phones, laptops']
              ].map(([label, key, placeholder]) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  {key === 'description' ? (
                    <textarea
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      rows="3"
                      required
                      placeholder={placeholder}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      required
                      placeholder={placeholder}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}

              {/* Price & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (₹) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    min="0"
                    placeholder="0.00"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock *</label>
                  <input
                    type="number"
                    value={form.inventory}
                    onChange={(e) => setForm({ ...form, inventory: e.target.value })}
                    required
                    min="0"
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                >
                  {loading ? '⏳ Processing...' : (editId ? '💾 Update' : '➕ Add Product')}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-6 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Product Inventory</h2>
              <p className="text-xs text-gray-600 mt-1">Total: {products.length} products</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {['Product', 'Price', 'Stock', 'Action'].map((h) => (
                      <th
                        key={h}
                        className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-10 text-center text-gray-500 text-sm">
                        <div className="text-5xl mb-3">📦</div>
                        <p className="font-medium">No products yet</p>
                        <p className="text-xs">Add your first product</p>
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-blue-50 transition">
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap">₹{product.price}</td>
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                              product.inventory < 10
                                ? 'bg-red-100 text-red-800'
                                : product.inventory < 20
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {product.inventory}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleEdit(product)}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-blue-700"
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
