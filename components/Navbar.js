"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            TechMart
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-sm border-t">
          <div className="px-4 py-3 space-y-2">
            <Link
              href="/"
              className="block text-gray-600 hover:text-blue-600 font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/recommendations"
              className="block text-gray-600 hover:text-blue-600 font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Picks
            </Link>
            <Link
              href="/dashboard"
              className="block text-gray-600 hover:text-blue-600 font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="block text-gray-600 hover:text-blue-600 font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
