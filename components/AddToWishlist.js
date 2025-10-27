'use client'

import { useState } from 'react'

export default function AddToWishlist({ productId, productName }) {
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg transition"
    >
      {added ? `✓ ${productName} added!` : '💛 Add to Wishlist'}
    </button>
  )
}
