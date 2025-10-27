import fs from 'fs/promises'
import path from 'path'

async function getInventoryData() {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const data = await fs.readFile(filePath, 'utf8')
  const products = JSON.parse(data)
  
  return {
    total: products.length,
    lowStock: products.filter(p => p.inventory < 10).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.inventory), 0),
    products
  }
}

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const stats = await getInventoryData()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Dashboard</h1>
      <p className="text-gray-600 mb-8">Real-time inventory statistics</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-4xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-gray-600 mt-2">Total Products</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className={`text-4xl font-bold ${stats.lowStock > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {stats.lowStock}
          </div>
          <div className="text-gray-600 mt-2">Low Stock Items</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-4xl font-bold text-blue-600">
            ₹{(stats.totalValue / 1000).toFixed(0)}K
          </div>
          <div className="text-gray-600 mt-2">Total Inventory Value</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {product.inventory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.inventory < 10
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.inventory < 10 ? 'Low' : 'Good'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
