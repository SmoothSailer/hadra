# 🗺️ Wadi Hadramout - Site Map & Features

Complete map of all pages and features in the restaurant website.

---

## 📑 Site Structure

### Public Pages (No Login Required)

#### 🏠 Home Page `/`
- **URL**: `http://localhost:3000/`
- **Features**:
  - Hero section with restaurant name (Arabic & English)
  - Beautiful intro message
  - "Order Now" & "Learn More" buttons
  - About section with restaurant info
  - Why Choose Us section
  - Featured dishes showcase
  - Call-to-action banner
  - Restaurant location: Pangani, Nairobi
  - Hours: Daily 11:00 AM - 10:00 PM

#### 📋 Menu Page `/menu`
- **URL**: `http://localhost:3000/menu`
- **Features**:
  - Browse all menu items
  - Filter by category:
    - All
    - Main Dishes
    - Appetizers
    - Desserts
    - Beverages
  - View item name, description, price
  - Add to cart button
  - Quantity selector
  - Item availability status
  - Search/filter functionality
  - Responsive grid layout

#### 🛒 Shopping Cart `/cart`
- **URL**: `http://localhost:3000/cart`
- **Features**:
  - View all cart items
  - See item prices
  - Adjust quantities with +/- buttons
  - Remove items option
  - Subtotal calculation
  - Delivery fee display (+KES 100)
  - Total price display
  - "Proceed to Checkout" button
  - "Clear Cart" option
  - Continue shopping link

#### 💳 Checkout Page `/checkout`
- **URL**: `http://localhost:3000/checkout`
- **Features**:
  - Order summary with all items
  - Delivery Information form:
    - Full Name (required)
    - Email (optional)
    - Phone Number (required)
    - Delivery Address (required)
    - Payment Method (selector)
  - Order review sidebar
  - Item breakdown
  - Delivery fee info
  - Final total
  - "Place Order" button
  - Delivery area info (Pangani & nearby)
  - Estimated delivery time

#### ✅ Order Success Page `/order-success`
- **URL**: `http://localhost:3000/order-success?orderId=xyz`
- **Features**:
  - Success message
  - Order ID display
  - Delivery information
  - Restaurant contact details
  - "View My Orders" button
  - "Back to Home" button

#### 📦 My Orders Page `/orders`
- **URL**: `http://localhost:3000/orders`
- **Features**:
  - View order history
  - Order ID and date
  - Order status badge:
    - Pending (yellow)
    - Confirmed (blue)
    - Ready (blue)
    - Delivered (green)
  - Items list with quantities
  - Total price per order
  - Delivery address
  - Order date and time

---

## 👨‍💼 Admin Pages

#### 📊 Admin Dashboard `/admin`
- **URL**: `http://localhost:3000/admin`
- **Features**:
  - Order management:
    - View all orders
    - Filter by status
    - Update order status
    - Real-time updates
  - Statistics:
    - Total orders count
    - Pending orders
    - Ready orders
    - Delivered orders
  - Order table with:
    - Order ID
    - Customer name
    - Phone number
    - Total amount
    - Status (editable dropdown)
    - Date created
    - View option

---

## 🧩 Components

### Navbar Component
- Location: `components/Navbar.tsx`
- Features:
  - Restaurant logo
  - Navigation links (Home, Menu, Orders, Cart)
  - Cart icon with item count badge
  - Responsive design
  - Mobile navigation

### Footer Component
- Location: `components/Footer.tsx`
- Features:
  - About section
  - Quick links
  - Hours of operation
  - Contact information
  - Copyright notice
  - Multiple columns layout

### MenuItemCard Component
- Location: `components/MenuItemCard.tsx`
- Features:
  - Item image/icon
  - Item name
  - Description
  - Price display
  - Availability status
  - Quantity selector
  - Add to cart button
  - Visual feedback on add

---

## 🔌 API Endpoints

### Orders Endpoints

#### Create Order
- **Route**: `POST /api/orders`
- **Purpose**: Create new order
- **Returns**: Order object with ID

#### Get Orders
- **Route**: `GET /api/orders`
- **Purpose**: Fetch all orders (admin)
- **Returns**: Array of orders

---

## 💾 Data Models

### Menu Item
```typescript
{
  id: string (UUID)
  name: string
  description: string
  price: number
  category: string
  image_url?: string
  available: boolean
  created_at: string
  updated_at: string
}
```

### Order
```typescript
{
  id: string (UUID)
  customer_name: string
  customer_email?: string
  customer_phone: string
  delivery_address: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'
  payment_method?: string
  created_at: string
  updated_at: string
}
```

### Cart Item
```typescript
{
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}
```

---

## 🎨 UI/UX Elements

### Colors Used
- **Gold**: `#D4AF37` - Primary accent
- **Dark Brown**: `#2D1810` - Text & headers
- **Cream**: `#F5E6D3` - Background
- **Gray**: Various shades for borders and secondary elements

### Button Types
- **Primary Button** (Gold background)
  - "Order Now", "View Full Menu", "Place Order"
- **Secondary Button** (Dark Brown background)
  - "Learn More", "Clear Cart"
- **Status Selector** (Gold border)
  - Admin order status updates

### Badges
- **Availability**: Green (Available), Red (Out of Stock)
- **Order Status**: Yellow (Pending), Blue (Confirmed/Ready), Green (Delivered)
- **Cart Count**: Gold badge on cart icon

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px+

All pages are fully responsive!

---

## 🔄 User Flow

### Customer Journey

1. **Land on Home** → `/`
   - View restaurant info
   - Click "Order Now"

2. **Browse Menu** → `/menu`
   - Filter by category
   - Select items
   - Add to cart

3. **Review Cart** → `/cart`
   - Adjust quantities
   - View total
   - Proceed to checkout

4. **Checkout** → `/checkout`
   - Enter delivery info
   - Select payment method
   - Place order

5. **Order Confirmation** → `/order-success`
   - See order ID
   - Get restaurant info

6. **Track Order** → `/orders`
   - View order status
   - See delivery info

---

## 🔑 Key Features

### Shopping System
✅ Add items to cart  
✅ Remove items  
✅ Update quantities  
✅ Calculate totals  
✅ Apply delivery fee  

### Ordering System
✅ Collect delivery info  
✅ Multiple payment methods  
✅ Order confirmation  
✅ Order history  

### Admin System
✅ View all orders  
✅ Filter by status  
✅ Update order status  
✅ Order statistics  

### Design System
✅ Consistent colors  
✅ Responsive layout  
✅ Beautiful typography  
✅ Professional styling  
✅ Accessible interface  

---

## 📊 Sample Menu Data

### Main Dishes
- Shawarma (Chicken/Lamb)
- Shuwa
- Fahsa
- Biryani

### Appetizers
- Falafel
- Hummus
- Tabbouleh

### Desserts
- Honey Cake
- Baklava

### Beverages
- Mango Juice
- Karak Tea
- Lemon Juice

---

## 🔐 Authentication (Optional)

### Future Integration
- Supabase Auth
- User sign up/login
- Profile management
- Order history per user
- Saved addresses

---

## 📈 Analytics & Tracking

### Metrics to Monitor
- Total orders
- Average order value
- Popular items
- Peak hours
- Customer locations
- Delivery times

---

## 🚀 Performance Metrics

### Page Load Targets
- Home: < 1s
- Menu: < 2s
- Cart: < 500ms
- Checkout: < 1.5s

### Core Web Vitals
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

---

## 🌐 SEO Features

- Meta descriptions
- Open Graph tags
- Structured data
- Mobile-friendly design
- Fast load times
- Semantic HTML

---

## ♿ Accessibility Features

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast
- Form labels
- Alt text for images

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `QUICKSTART.md` | Quick setup guide |
| `DATABASE_SETUP.md` | Database schema |
| `DEPLOYMENT.md` | Deployment guide |
| `API_DOCS.md` | API reference |
| `PROJECT_SUMMARY.md` | Project overview |
| `SITEMAP.md` | This file |

---

## 🔗 External Resources

### API & Services
- Supabase: https://supabase.com
- Vercel: https://vercel.com
- Tailwind CSS: https://tailwindcss.com

### Tools
- VS Code: https://code.visualstudio.com
- Git: https://git-scm.com
- Node.js: https://nodejs.org

---

## ✨ Complete Feature List

### ✅ Implemented
- [x] Home page
- [x] Menu browsing
- [x] Category filtering
- [x] Shopping cart
- [x] Checkout flow
- [x] Order placement
- [x] Order tracking
- [x] Admin dashboard
- [x] Responsive design
- [x] Database integration
- [x] API endpoints
- [x] Type safety

### 🔄 Ready to Implement
- [ ] User authentication
- [ ] Payment gateway (M-Pesa, Stripe)
- [ ] SMS notifications
- [ ] Email notifications
- [ ] Reviews & ratings
- [ ] Loyalty program
- [ ] Search functionality
- [ ] Wishlist
- [ ] Multiple locations
- [ ] Promo codes
- [ ] Advanced analytics

---

**Your complete restaurant website is ready to serve!** 🌅

See **QUICKSTART.md** to start now!
