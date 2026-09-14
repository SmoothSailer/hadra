'use client'

import { useState, useEffect } from 'react'
import { Order } from '@/lib/types'
import { supabase } from '@/lib/supabase'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        // Demo - no actual orders fetched
        setOrders([])
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-darkbrown">My Orders</h1>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg text-center">
          <p className="text-xl text-gray-600 mb-4">No orders yet</p>
          <a href="/menu" className="btn-primary inline-block">
            Start Ordering
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Order #{order.id.slice(0, 8)}</h3>
                  <p className="text-gray-600">{new Date(order.created_at || '').toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full font-semibold ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>KES {item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Delivery to:</p>
                  <p className="font-semibold">{order.delivery_address}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gold">KES {order.total}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
