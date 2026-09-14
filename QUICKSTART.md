# 🚀 Quick Start Guide - Wadi Hadramout Restaurant

Get your Wadi Hadramout restaurant website up and running in 5 minutes!

## ⚡ Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Free signup](https://supabase.com)

## 📋 Step 1: Set Up Supabase (5 min)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project:
   - Click "New Project"
   - Enter project name: `wadi-hadramout`
   - Set password
   - Select region closest to Kenya
   - Click "Create new project"
3. Wait for project to initialize (1-2 minutes)
4. Copy your credentials:
   - Go to **Settings → API**
   - Copy **Project URL** (this is your NEXT_PUBLIC_SUPABASE_URL)
   - Copy **anon public key** (this is your NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 🗄️ Step 2: Create Database Tables (3 min)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'main',
  image_url VARCHAR(500),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, available) VALUES
  ('Shawarma Chicken', 'Seasoned chicken wrapped in fresh bread', 350, 'main', true),
  ('Shuwa', 'Traditional slow-cooked lamb', 450, 'main', true),
  ('Fahsa', 'Spiced meat with bean sauce', 400, 'main', true),
  ('Biryani', 'Fragrant rice with meat and spices', 420, 'main', true),
  ('Falafel', 'Crispy fried chickpea fritters', 200, 'appetizer', true),
  ('Hummus', 'Creamy chickpea dip', 180, 'appetizer', true),
  ('Honey Cake', 'Sweet spiced cake with honey', 150, 'dessert', true),
  ('Mango Juice', 'Fresh mango juice', 100, 'beverages', true),
  ('Karak Tea', 'Strong Arabian tea', 80, 'beverages', true);
```

4. Click **Run** button

## 💻 Step 3: Set Up Project Locally (2 min)

```bash
# Navigate to project directory
cd /Users/farhan/codebase/Wadi-Hadramout

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

## 🔑 Step 4: Add Your Supabase Credentials

1. Open `.env.local` file in VS Code
2. Replace with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

## 🏃 Step 5: Run Development Server

```bash
npm run dev
```

Your site is now live at: **http://localhost:3000**

## 🎉 Done! Test It Out

### What You Can Do:

1. **Home Page** - Visit http://localhost:3000
   - View restaurant information
   - See featured dishes
   - Learn about location

2. **Browse Menu** - Click "View Full Menu"
   - See all dishes with prices
   - Filter by category
   - Add items to cart

3. **Shopping Cart** - Click cart icon
   - Adjust quantities
   - View total with delivery fee
   - Proceed to checkout

4. **Place Order** - Complete checkout form
   - Enter delivery details
   - Select payment method
   - Get order confirmation

5. **Admin Dashboard** - Visit http://localhost:3000/admin
   - View all orders
   - Update order status
   - Track deliveries

## 📱 Features Ready to Use

✅ Beautiful responsive design  
✅ Menu browsing with categories  
✅ Shopping cart system  
✅ Order checkout  
✅ Admin dashboard  
✅ Supabase integration  
✅ Mobile-friendly  

## 🚀 Next Steps: Deploy to Production

When ready to launch:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Wadi Hadramout restaurant website"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Add environment variables
   - Click Deploy!

3. **Connect Custom Domain**
   - Update DNS records
   - Set custom domain in Vercel

## 📚 Documentation

- **Full Setup Guide**: See `DATABASE_SETUP.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **README**: See `README.md` for complete documentation

## 🆘 Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Supabase connection error?
- Check `.env.local` file
- Verify credentials are correct
- Check internet connection

### Database tables not showing?
- Verify SQL ran successfully in Supabase
- Check table names match your code

### Still having issues?
1. Check browser console for errors
2. Check terminal for error messages
3. Review full documentation in README.md

## 💡 Tips

- Use Supabase dashboard to manage menu items
- Test payment methods before going live
- Add customer contact info to footer
- Consider adding SMS notifications

## 🎯 Customization Ideas

- Add restaurant logo and branding
- Upload real dish photos
- Customize color scheme
- Add reviews/ratings system
- Implement loyalty program
- Add table reservation feature

---

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**You're all set! 🌅 Happy serving! 🍖**

For questions or issues, check the full README.md or DATABASE_SETUP.md
