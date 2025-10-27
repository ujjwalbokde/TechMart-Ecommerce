import Link from 'next/link'

export const revalidate = 60

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

async function getProduct(slug) {
  try {
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    })
    const products = await res.json()
    return products.map((p) => ({ slug: p.slug }))
  } catch (err) {
    console.error('Error generating static params:', err)
    return []
  }
}

export default async function ProductDetail({ params }) {
  const {slug} = await params
  const product = await getProduct(slug)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg flex items-center justify-center text-8xl">
            📦
          </div>
          
          <div>
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              ₹{product.price.toLocaleString()}
            </div>
            <p className="text-gray-700 mb-6">
              <strong>Inventory:</strong> {product.inventory} units
            </p>
            
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Add to Cart
              </button>
              <button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                Add to Wishlist
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-6">
              Last updated: {new Date(product.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
