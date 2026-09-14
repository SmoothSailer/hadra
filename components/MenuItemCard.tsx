'use client'

import { MenuItem } from '@/lib/types'
import { useCart } from '@/lib/store'
import { useState } from 'react'

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image_url,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="bg-gold/20 h-48 flex items-center justify-center">
        <span className="text-6xl">🍖</span>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gold">KES {item.price}</span>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${
            item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {item.available ? 'Available' : 'Out of Stock'}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded transition"
          >
            −
          </button>
          <span className="flex-1 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded transition"
          >
            +
          </button>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!item.available}
          className={`w-full py-2 rounded-lg font-bold transition ${
            added
              ? 'bg-green-500 text-white'
              : item.available
              ? 'btn-primary'
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          }`}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
