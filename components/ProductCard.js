import Link from 'next/link'

export default function ProductCard({ product }) {
  const icons = ['💻', '📱', '⌨️', '🖱️', '🎧', '📷']
  const randomIcon = icons[Math.floor(Math.random * icons.length)]

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-gray-300 flex items-center justify-center text-6xl">
          {randomIcon}
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            ₹{product.price.toLocaleString()}
          </div>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
            product.inventory < 10
              ? 'bg-red-50 text-red-700'
              : 'bg-green-50 text-green-700'
          }`}>
            {product.inventory < 10 ? 'Low Stock' : 'In Stock'}
          </span>
        </div>
      </div>
    </Link>
  )
}
