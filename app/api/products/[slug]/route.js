import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

const filePath = path.join(process.cwd(), 'data', 'products.json')

export async function GET(request, { params }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  const data = await fs.readFile(filePath, 'utf8')
  const products = JSON.parse(data)

  console.log('slug:', slug)
  console.log('products:', products)

  const product = products.find(p => String(p.slug) === String(slug))

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}


export async function PUT(request, { params }) {
  try {
    // ✅ unwrap params (Next.js 15+)
    const resolvedParams = await params
    const { slug: id } = resolvedParams
    

    // ✅ parse updated data
    const updatedProduct = await request.json()

    // ✅ read file
    const data = await fs.readFile(filePath, 'utf8')
    const products = JSON.parse(data)

    // ✅ find and update product
    const index = products.findIndex((p) => String(p.id) === String(id))
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    products[index] = { ...products[index], ...updatedProduct }
    await fs.writeFile(filePath, JSON.stringify(products, null, 2))

    return NextResponse.json(products[index])
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
