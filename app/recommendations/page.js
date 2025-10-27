import fs from 'fs/promises'
import path from 'path'
import AddToWishlist from '../../components/AddToWishlist'

async function getRecommendations() {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const data = await fs.readFile(filePath, 'utf8')
  const products = JSON.parse(data)
  return products.slice(0, 3)
}

export default async function Recommendations() {
  const recommended = await getRecommendations()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Recommended for You</h1>
      <p className="text-gray-600 mb-8">Handpicked products based on your interests</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-6xl">
              ⭐
            </div>
            <div className="p-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {product.category}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {product.description.substring(0, 80)}...
              </p>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                ₹{product.price.toLocaleString()}
              </div>
              <AddToWishlist productId={product.id} productName={product.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
