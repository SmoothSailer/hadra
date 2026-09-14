'use client'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-darkbrown to-gray-900 text-cream py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">وادي حضرموت</h1>
            <h2 className="text-3xl font-semibold mb-6 text-gold">Wadi Hadramout</h2>
            <p className="text-lg mb-4">Authentic Yemeni & Arabian Cuisine</p>
            <p className="text-base text-gray-300 mb-8">Experience the flavors of Yemen in the heart of Pangani, Nairobi</p>
            <div className="flex gap-4 justify-center">
              <a href="/menu" className="btn-primary">
                Order Now
              </a>
              <a href="#about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-8 text-center text-darkbrown">About Us</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4 text-gray-700">
                Wadi Hadramout brings authentic Yemeni and Arabian cuisine to Pangani, Nairobi. Our restaurant is dedicated to serving traditional recipes passed down through generations, prepared with the finest quality ingredients.
              </p>
              <p className="text-lg mb-4 text-gray-700">
                Located in the vibrant Pangani area, we provide a warm and welcoming atmosphere where families and friends can gather and enjoy delicious meals.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>📍 Location:</strong> Pangani, Nairobi, Kenya</p>
                <p><strong>🕐 Hours:</strong> Daily 11:00 AM - 10:00 PM</p>
                <p><strong>📞 Contact:</strong> Call or order online</p>
              </div>
            </div>
            <div className="bg-gold/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gold">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-gold">✓</span>
                  <span>Authentic traditional recipes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold">✓</span>
                  <span>Fresh quality ingredients</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold">✓</span>
                  <span>Fast and reliable delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold">✓</span>
                  <span>Affordable prices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold">✓</span>
                  <span>Friendly customer service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-cream">
        <div className="container">
          <h2 className="text-4xl font-bold mb-8 text-center text-darkbrown">Featured Dishes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Shawarma', desc: 'Seasoned meat wrapped in bread' },
              { name: 'Shuwa', desc: 'Traditional slow-cooked lamb' },
              { name: 'Fahsa', desc: 'Spiced meat with bean sauce' },
            ].map((dish) => (
              <div key={dish.name} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="bg-gold/30 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gold text-4xl">🍖</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                <p className="text-gray-600">{dish.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-darkbrown text-cream py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="mb-6 text-gray-300">Browse our full menu and place your order now!</p>
          <a href="/menu" className="btn-primary inline-block">
            View Full Menu
          </a>
        </div>
      </section>
    </div>
  )
}
