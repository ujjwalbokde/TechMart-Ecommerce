
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'TechMart - Your Tech Store',
  description: 'Browse the latest tech products',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                TechMart
              </Link>
              <div className="flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
                  Home
                </Link>
                <Link href="/recommendations" className="text-gray-600 hover:text-blue-600 font-medium transition">
                  Picks
                </Link>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition">
                  Dashboard
                </Link>
                <Link href="/admin" className="text-gray-600 hover:text-blue-600 font-medium transition">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-50 text-gray-800 text-center py-8 mt-16">
          <p>© 2025 TechMart. Built with Next.js & Tailwind CSS</p>
        </footer>
      </body>
    </html>
  )
}
