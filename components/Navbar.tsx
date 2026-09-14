'use client'

import Link from 'next/link'
import { useCart } from '@/lib/store'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { items } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = mounted ? items.length : 0

  return (
    <nav className="bg-darkbrown text-cream shadow-lg">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gold">🌅</span>
          <span className="font-bold text-xl">Wadi Hadramout</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-gold transition">
            Home
          </Link>
          <Link href="/menu" className="hover:text-gold transition">
            Menu
          </Link>
          <Link href="/orders" className="hover:text-gold transition">
            My Orders
          </Link>
          <Link href="/cart" className="relative hover:text-gold transition">
            <span>🛒 Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-gold text-darkbrown text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
