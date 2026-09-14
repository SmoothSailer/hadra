'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-darkbrown text-cream py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">About</h3>
            <p className="text-sm text-gray-300">
              Wadi Hadramout - Authentic Yemeni & Arabian cuisine in Pangani, Nairobi.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/menu" className="hover:text-gold transition">Menu</Link></li>
              <li><Link href="/orders" className="hover:text-gold transition">Orders</Link></li>
              <li><Link href="/cart" className="hover:text-gold transition">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Hours</h3>
            <p className="text-sm text-gray-300">Daily: 11:00 AM - 10:00 PM</p>
            <p className="text-sm text-gray-300 mt-2">Closed on public holidays</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Contact</h3>
            <p className="text-sm text-gray-300">📍 Pangani, Nairobi</p>
            <p className="text-sm text-gray-300">📞 +254 (0) XXX XXX XXX</p>
            <p className="text-sm text-gray-300">✉️ info@wadihadramout.co.ke</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            © 2024 Wadi Hadramout Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
