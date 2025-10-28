import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

const filePath = path.join(process.cwd(), 'data', 'products.json')

export async function GET() {
  console.log("I AM HERE")
  const data = await fs.readFile(filePath, 'utf8')
  return NextResponse.json(JSON.parse(data))
}

export async function POST(request) {
  console.log(request)
  const newProduct = await request.json()
  const data = await fs.readFile(filePath, 'utf8')
  const products = JSON.parse(data)
  products.push(newProduct)
  await fs.writeFile(filePath, JSON.stringify(products, null, 2))
  return NextResponse.json(newProduct, { status: 201 })
}
