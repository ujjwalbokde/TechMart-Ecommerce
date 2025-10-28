
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'TechMart - Your Tech Store',
  description: 'Browse the latest tech products',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
       <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-50 text-gray-800 text-center py-8 mt-16">
          <p>© 2025 TechMart. Built with Next.js & Tailwind CSS</p>
        </footer>
      </body>
    </html>
  )
}
