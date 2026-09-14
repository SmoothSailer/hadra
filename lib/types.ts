export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url?: string
  available: boolean
  created_at?: string
}

export interface Order {
  id: string
  user_id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'
  delivery_address: string
  phone: string
  created_at?: string
  updated_at?: string
}

export interface OrderItem {
  menu_item_id: string
  quantity: number
  price: number
  name: string
}

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  address?: string
  created_at?: string
}
