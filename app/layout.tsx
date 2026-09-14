import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Wadi Hadramout - Yemeni Restaurant | Pangani, Nairobi',
  description: 'Experience authentic Yemeni and Arabian cuisine at Wadi Hadramout in Pangani, Nairobi. Order online for delivery or pickup.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-darkbrown">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
