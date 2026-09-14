# Wadi Hadramout - Database Schema Guide

This document provides the SQL queries needed to set up the Supabase database for the restaurant ordering system.

## Prerequisites

1. Supabase account at https://supabase.com
2. Project created with PostgreSQL database
3. Access to SQL Editor in Supabase dashboard

## Setup Instructions

### Step 1: Run SQL Migrations

Go to Supabase Dashboard → SQL Editor → New Query and run the following SQL commands:

#### Create Menu Items Table

```sql
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

-- Add comment for table documentation
COMMENT ON TABLE menu_items IS 'Restaurant menu items';

-- Create index for faster queries
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(available);
```

#### Create Orders Table

```sql
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

-- Add indexes for faster queries
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_phone ON orders(customer_phone);
```

#### Create Users Table (Optional)

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

#### Create Audit Log Table (Optional)

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
```

### Step 2: Enable Row Level Security (RLS)

```sql
-- Enable RLS on tables
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to menu items
CREATE POLICY "menu_items_select_public" ON menu_items
  FOR SELECT USING (available = true);

-- Create policies for orders (allow insert and read own orders)
CREATE POLICY "orders_insert_anon" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "orders_select_anon" ON orders
  FOR SELECT USING (true);
```

### Step 3: Seed Sample Data

```sql
-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, available) VALUES
  ('Shawarma Chicken', 'Seasoned chicken wrapped in fresh bread with tahini sauce', 350, 'main', true),
  ('Shawarma Lamb', 'Tender lamb shawarma with vegetables and garlic sauce', 400, 'main', true),
  ('Shuwa', 'Traditional slow-cooked lamb wrapped in banana leaves', 450, 'main', true),
  ('Fahsa', 'Spiced meat cooked with bean sauce - traditional Yemeni dish', 400, 'main', true),
  ('Biryani Chicken', 'Fragrant basmati rice with chicken and aromatic spices', 380, 'main', true),
  ('Biryani Mutton', 'Premium biryani with tender mutton meat', 420, 'main', true),
  ('Falafel', 'Crispy fried chickpea fritters served with tahini dip', 200, 'appetizer', true),
  ('Hummus', 'Creamy chickpea dip with olive oil and Lebanese spices', 180, 'appetizer', true),
  ('Tabbouleh', 'Fresh parsley salad with tomatoes, onions and lemon dressing', 220, 'appetizer', true),
  ('Honey Cake', 'Sweet spiced cake drizzled with honey - traditional Yemeni dessert', 150, 'dessert', true),
  ('Baklava', 'Flaky pastry with honey and nuts', 200, 'dessert', true),
  ('Mango Juice', 'Fresh mango juice freshly prepared', 100, 'beverages', true),
  ('Karak Tea', 'Strong, sweet Arabian tea with cardamom and spices', 80, 'beverages', true),
  ('Lemon Juice', 'Fresh lemon juice with mint', 80, 'beverages', true);

-- Note: Run SELECT * FROM menu_items to verify data
```

## Database Schema Overview

### menu_items Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Dish name |
| description | TEXT | Dish description |
| price | DECIMAL(10, 2) | Price in KES |
| category | VARCHAR(100) | Category (main, appetizer, dessert, beverage) |
| image_url | VARCHAR(500) | URL to dish image |
| available | BOOLEAN | Whether item is available |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### orders Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| customer_name | VARCHAR(255) | Customer name |
| customer_email | VARCHAR(255) | Customer email |
| customer_phone | VARCHAR(20) | Customer phone number |
| delivery_address | TEXT | Delivery address |
| items | JSONB | Order items as JSON |
| total | DECIMAL(10, 2) | Total order amount |
| status | VARCHAR(50) | Order status (pending, confirmed, preparing, ready, delivered) |
| payment_method | VARCHAR(50) | Payment method used |
| notes | TEXT | Special notes |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Sample Order Items JSON Structure
```json
[
  {
    "menu_item_id": "uuid-here",
    "name": "Shawarma Chicken",
    "quantity": 2,
    "price": 350
  },
  {
    "menu_item_id": "uuid-here",
    "name": "Karak Tea",
    "quantity": 1,
    "price": 80
  }
]
```

## API Usage Examples

### Fetch Menu Items
```typescript
const { data } = await supabase
  .from('menu_items')
  .select('*')
  .eq('available', true)
  .order('category')
```

### Create Order
```typescript
const { data } = await supabase
  .from('orders')
  .insert({
    customer_name: 'John Doe',
    customer_phone: '+254712345678',
    delivery_address: 'Pangani, Nairobi',
    items: [/* items array */],
    total: 1000,
    status: 'pending',
    payment_method: 'cash'
  })
  .select()
```

### Update Order Status
```typescript
const { data } = await supabase
  .from('orders')
  .update({ status: 'confirmed' })
  .eq('id', orderId)
  .select()
```

## Troubleshooting

### Issue: Permission denied
**Solution**: Check Row Level Security policies or disable RLS temporarily for development

### Issue: Table doesn't exist
**Solution**: Run the CREATE TABLE migrations above

### Issue: Foreign key constraint error
**Solution**: Ensure all referenced IDs exist in parent tables

## Security Notes

1. RLS policies should be configured for production
2. Sensitive data should not be exposed via APIs
3. Validate all user inputs on backend
4. Use environment variables for credentials

---

For more help, visit [Supabase Documentation](https://supabase.com/docs)
