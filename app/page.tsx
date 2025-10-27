import SearchBar from '../components/SearchBar'
import fs from 'fs/promises'
import path from 'path'

async function getProducts() {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const data = await fs.readFile(filePath, 'utf8')
  return JSON.parse(data)
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl p-12 mb-8 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome to TechMart</h1>
        <p className="text-xl text-purple-100">Find the best tech at great prices</p>
      </div>

      <SearchBar products={products} />
    </div>
  )
}
