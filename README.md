# Wadi Hadramout Restaurant Website

A modern, full-stack restaurant ordering website for **Wadi Hadramout**, an authentic Yemeni & Arabian restaurant located in **Pangani, Nairobi, Kenya**.

## 🌟 Features

- 🏠 **Home Page**: Beautiful landing page with restaurant info
- 🍖 **Menu System**: Browse and filter menu items by category
- 🛒 **Shopping Cart**: Add/remove items, manage quantities
- 💳 **Checkout**: Delivery info and order placement
- 📦 **Order Tracking**: View order status and history
- 💾 **Database**: Supabase for backend storage
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- ⚡ **Fast Performance**: Built with Next.js 15

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom theme
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (optional)
- **Deployment**: Vercel (recommended)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier available)

### Setup Steps

1. **Clone the repository**
```bash
cd /Users/farhan/codebase/Wadi-Hadramout
```

2. **Install dependencies**
```bash
npm install
```

3. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your Project URL and Anon Key

4. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. **Run development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🗄️ Database Setup

Create the following tables in your Supabase project:

### 1. `menu_items` Table
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. `orders` Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. `users` Table (Optional - for user accounts)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🍽️ Sample Menu Items

You can seed the database with these sample items:

```sql
INSERT INTO menu_items (name, description, price, category, available) VALUES
('Shawarma', 'Seasoned chicken or lamb wrapped in fresh bread', 350, 'main', true),
('Shuwa', 'Traditional slow-cooked lamb wrapped in banana leaves', 450, 'main', true),
('Fahsa', 'Spiced meat cooked with bean sauce', 400, 'main', true),
('Biryani', 'Fragrant rice cooked with meat and spices', 420, 'main', true),
('Falafel', 'Crispy fried chickpea fritters', 200, 'appetizer', true),
('Hummus', 'Creamy chickpea dip with olive oil', 180, 'appetizer', true),
('Honey Cake', 'Sweet spiced cake drizzled with honey', 150, 'dessert', true),
('Mango Juice', 'Fresh mango juice', 100, 'beverages', true),
('Karak Tea', 'Strong, sweet Arabian tea', 80, 'beverages', true);
```

## 📁 Project Structure

```
Wadi-Hadramout/
├── app/
│   ├── (pages)/          # Page routes
│   │   ├── menu/         # Menu listing
│   │   ├── cart/         # Shopping cart
│   │   ├── checkout/     # Order checkout
│   │   ├── orders/       # Order history
│   │   └── order-success/
│   ├── api/              # API routes
│   │   └── orders/       # Order endpoints
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MenuItemCard.tsx
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── store.ts          # Zustand store
│   └── types.ts          # TypeScript types
├── public/               # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🚀 Key Pages

### Home Page (`/`)
- Restaurant hero section
- About section with restaurant info
- Featured dishes showcase
- Call-to-action buttons

### Menu Page (`/menu`)
- Browse all menu items
- Filter by category (main, appetizer, dessert, beverages)
- Add items to cart
- View item prices and descriptions

### Cart Page (`/cart`)
- View cart items
- Adjust quantities
- Remove items
- Cart total with delivery fee

### Checkout Page (`/checkout`)
- Delivery information form
- Order review
- Payment method selection
- Order confirmation

### Orders Page (`/orders`)
- View order history
- Track order status
- View order details

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- **Gold**: `#D4AF37` - Primary accent
- **Dark Brown**: `#2D1810` - Primary text/background
- **Cream**: `#F5E6D3` - Light background

### Restaurant Information
Update these files with actual restaurant details:
- `app/page.tsx` - Home page info
- `components/Footer.tsx` - Contact info
- `components/Navbar.tsx` - Logo/branding

### Menu Items
Add menu items directly in Supabase or edit the sample data in `app/(pages)/menu/page.tsx`

## 📱 Responsive Design

The site is fully responsive and works on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Deploy to Other Platforms

The app can also be deployed to:
- Netlify
- Railway
- Render
- AWS Amplify

## 🔐 Security

- Environment variables are never exposed client-side
- Supabase Auth can be added for user accounts
- Payment integration (M-Pesa, Stripe) can be added
- Input validation on all forms

## 📝 Future Enhancements

- [ ] User authentication and accounts
- [ ] Payment gateway integration (M-Pesa, Stripe)
- [ ] Order notifications (SMS/Email)
- [ ] Admin dashboard for managing orders and menu
- [ ] Ratings and reviews system
- [ ] Loyalty program
- [ ] Table reservations
- [ ] Multi-language support (Arabic)
- [ ] Push notifications

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Supabase connection error
- Check environment variables
- Verify Supabase project is active
- Check network connectivity

### Database migration issues
- Run migrations manually in Supabase SQL editor
- Verify table structure matches schemas

## 📞 Support

For issues or questions:
1. Check Supabase documentation
2. Review Next.js documentation
3. Check GitHub issues

## 📄 License

This project is proprietary software for Wadi Hadramout Restaurant.

---

**Made with ❤️ for Wadi Hadramout Restaurant, Pangani, Nairobi**
