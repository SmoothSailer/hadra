'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-2 text-green-600">Order Placed!</h1>
        <p className="text-gray-600 mb-2">Thank you for your order</p>
        
        {orderId && (
          <div className="bg-gold/10 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-mono font-bold text-lg break-all">{orderId}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm text-blue-800">
          <p className="mb-2"><strong>📍 Location:</strong> Pangani, Nairobi</p>
          <p className="mb-2"><strong>⏱️ Delivery:</strong> 30-45 minutes</p>
          <p><strong>📞 Call us:</strong> +254 (0) XXX XXX XXX</p>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          Your order has been received and is being prepared. You'll receive a call confirmation shortly.
        </p>

        <div className="space-y-3">
          <Link href="/orders" className="btn-primary block">
            View My Orders
          </Link>
          <Link href="/" className="btn-secondary block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container py-12 text-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
