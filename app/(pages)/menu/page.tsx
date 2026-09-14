'use client'

import { useState, useEffect } from 'react'
import MenuItemCard from '@/components/MenuItemCard'
import { MenuItem } from '@/lib/types'
import { supabase } from '@/lib/supabase'

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('available', true)
          .order('category')

        if (error) {
          // Demo mode - show sample data if table doesn't exist
          setMenuItems(SAMPLE_MENU_ITEMS)
          setError(null)
        } else {
          setMenuItems(data || [])
        }
      } catch (err) {
        console.error('Error fetching menu:', err)
        // Fallback to sample menu
        setMenuItems(SAMPLE_MENU_ITEMS)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  const categories = ['all', ...new Set(menuItems.map(item => item.category))]
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-2 text-darkbrown">Our Menu</h1>
      <p className="text-gray-600 mb-8">Choose from our authentic Yemeni and Arabian dishes</p>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-gold text-darkbrown'
                : 'bg-gray-200 text-darkbrown hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading menu...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
          {error}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No items available in this category</p>
        </div>
      )}
    </div>
  )
}

// Sample menu items for demo
const SAMPLE_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Shawarma',
    description: 'Seasoned chicken or lamb wrapped in fresh bread with tahini sauce and vegetables',
    price: 350,
    category: 'main',
    available: true,
  },
  {
    id: '2',
    name: 'Shuwa',
    description: 'Traditional slow-cooked lamb wrapped in banana leaves, tender and flavorful',
    price: 450,
    category: 'main',
    available: true,
  },
  {
    id: '3',
    name: 'Fahsa',
    description: 'Spiced meat cooked with bean sauce, rich and authentic Yemeni flavor',
    price: 400,
    category: 'main',
    available: true,
  },
  {
    id: '4',
    name: 'Honey Cake',
    description: 'Sweet spiced cake drizzled with honey, traditional Yemeni dessert',
    price: 150,
    category: 'dessert',
    available: true,
  },
  {
    id: '5',
    name: 'Mango Juice',
    description: 'Fresh mango juice, perfect complement to your meal',
    price: 100,
    category: 'beverages',
    available: true,
  },
  {
    id: '6',
    name: 'Falafel',
    description: 'Crispy fried chickpea fritters served with tahini dip',
    price: 200,
    category: 'appetizer',
    available: true,
  },
  {
    id: '7',
    name: 'Hummus',
    description: 'Creamy chickpea dip with olive oil and spices',
    price: 180,
    category: 'appetizer',
    available: true,
  },
  {
    id: '8',
    name: 'Biryani',
    description: 'Fragrant rice cooked with meat and aromatic spices',
    price: 420,
    category: 'main',
    available: true,
  },
  {
    id: '9',
    name: 'Karak Tea',
    description: 'Strong, sweet Arabian tea with cardamom and spices',
    price: 80,
    category: 'beverages',
    available: true,
  },
]
