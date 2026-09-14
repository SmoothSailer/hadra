'use client'

import { useCart } from '@/lib/store'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="container py-12">Loading...</div>
  }

  const total = getTotal()

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-darkbrown">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/menu" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Order Summary</h2>
              </div>
              
              <div className="divide-y">
                {items.map(item => (
                  <div key={item.id} className="p-6 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gold font-semibold">KES {item.price} each</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded transition"
                      >
                        −
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded transition"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg">KES {item.price * item.quantity}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-gold/10 rounded-lg p-6 sticky top-20">
              <h3 className="text-2xl font-bold mb-6">Total Summary</h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">KES {total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">KES 100</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6 text-xl">
                <span className="font-bold">Total</span>
                <span className="font-bold text-gold">KES {total + 100}</span>
              </div>
              
              <Link href="/checkout" className="btn-primary block text-center mb-3">
                Proceed to Checkout
              </Link>
              
              <button
                onClick={clearCart}
                className="btn-secondary block text-center w-full"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
