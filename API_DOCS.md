# API Documentation - Wadi Hadramout Restaurant

Complete API reference for the Wadi Hadramout restaurant website.

## Base URL

```
http://localhost:3000/api
```

Or production:
```
https://wadi-hadramout.vercel.app/api
```

---

## Orders API

### POST /api/orders
Create a new order

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+254712345678",
    "address": "Pangani, Nairobi",
    "paymentMethod": "cash"
  },
  "items": [
    {
      "menu_item_id": "uuid-here",
      "name": "Shawarma Chicken",
      "quantity": 2,
      "price": 350
    }
  ],
  "total": 800,
  "status": "pending"
}
```

**Response:**
```json
{
  "id": "uuid-here",
  "customer_name": "John Doe",
  "customer_phone": "+254712345678",
  "delivery_address": "Pangani, Nairobi",
  "items": [...],
  "total": 800,
  "status": "pending",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request
- `500` - Server error

---

### GET /api/orders
Get all orders (admin only)

**Query Parameters:**
- `status` - Filter by status (pending, confirmed, preparing, ready, delivered)
- `limit` - Number of results (default: 50)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
[
  {
    "id": "uuid",
    "customer_name": "John Doe",
    "total": 800,
    "status": "pending",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

---

## Direct Supabase Queries

### Get Menu Items

```typescript
const { data, error } = await supabase
  .from('menu_items')
  .select('*')
  .eq('available', true)
  .order('category')

// Returns:
// [
//   {
//     id: 'uuid',
//     name: 'Shawarma',
//     price: 350,
//     category: 'main',
//     available: true
//   }
// ]
```

### Get Single Menu Item

```typescript
const { data, error } = await supabase
  .from('menu_items')
  .select('*')
  .eq('id', 'item-id')
  .single()
```

### Get Menu by Category

```typescript
const { data, error } = await supabase
  .from('menu_items')
  .select('*')
  .eq('category', 'main')
  .eq('available', true)
```

### Create Order

```typescript
const { data, error } = await supabase
  .from('orders')
  .insert({
    customer_name: 'John Doe',
    customer_email: 'john@example.com',
    customer_phone: '+254712345678',
    delivery_address: 'Pangani',
    items: [{...}],
    total: 800,
    status: 'pending',
    payment_method: 'cash'
  })
  .select()
  .single()
```

### Get Orders by Phone

```typescript
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('customer_phone', '+254712345678')
  .order('created_at', { ascending: false })
```

### Update Order Status

```typescript
const { data, error } = await supabase
  .from('orders')
  .update({ status: 'confirmed' })
  .eq('id', 'order-id')
  .select()
```

---

## Frontend Integration Examples

### Add Item to Cart

```typescript
import { useCart } from '@/lib/store'

const { addItem } = useCart()

const addToCart = (menuItem) => {
  addItem({
    id: menuItem.id,
    name: menuItem.name,
    price: menuItem.price,
    quantity: 1,
    image: menuItem.image_url
  })
}
```

### Get Cart Total

```typescript
import { useCart } from '@/lib/store'

const { items, getTotal } = useCart()

const total = getTotal()
```

### Place Order

```typescript
const handleOrder = async (formData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: formData,
      items: items,
      total: getTotal() + 100, // +100 delivery fee
      status: 'pending'
    })
  })

  const order = await response.json()
  console.log('Order created:', order.id)
}
```

---

## Error Handling

### Common Errors

#### Missing Required Fields
```json
{
  "error": "Missing required fields",
  "message": "customer_name, customer_phone required"
}
```

#### Invalid Email Format
```json
{
  "error": "Invalid email format",
  "message": "Please provide a valid email address"
}
```

#### Database Connection Error
```json
{
  "error": "Database error",
  "message": "Failed to connect to database"
}
```

---

## Rate Limiting

- **Unauthenticated**: 100 requests/hour
- **Authenticated**: 1000 requests/hour

If rate limited, you'll receive:
```json
{
  "error": "Too many requests",
  "status": 429,
  "retry_after": 60
}
```

---

## Authentication (Optional)

Supabase Auth can be added for user accounts:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

---

## Pagination

Get paginated results:

```typescript
// Page 1, 20 items per page
const { data } = await supabase
  .from('orders')
  .select('*', { count: 'exact' })
  .range(0, 19)

// Page 2, 20 items per page
const { data } = await supabase
  .from('orders')
  .select('*')
  .range(20, 39)
```

---

## Filtering Examples

```typescript
// Filter by status
const { data } = await supabase
  .from('orders')
  .select('*')
  .eq('status', 'pending')

// Filter by date range
const { data } = await supabase
  .from('orders')
  .select('*')
  .gte('created_at', '2024-01-01')
  .lte('created_at', '2024-01-31')

// Filter with multiple conditions
const { data } = await supabase
  .from('orders')
  .select('*')
  .eq('status', 'ready')
  .like('customer_name', '%John%')
```

---

## Webhooks (Advanced)

Supabase supports webhooks for real-time events:

```typescript
// Listen for order changes
const subscription = supabase
  .from('orders')
  .on('*', payload => {
    console.log('Order changed:', payload)
  })
  .subscribe()

// Clean up
subscription.unsubscribe()
```

---

## CORS Configuration

The API is CORS-enabled for:
- `http://localhost:3000`
- `https://wadi-hadramout.vercel.app`
- Custom domains (configurable)

---

## Best Practices

1. **Always validate input** on the frontend
2. **Use error handling** for all API calls
3. **Implement loading states** while fetching data
4. **Cache responses** when appropriate
5. **Use pagination** for large datasets
6. **Sanitize user input** before storing
7. **Log errors** for debugging
8. **Monitor API usage** for performance

---

## Testing the API

### Using cURL

```bash
# Create an order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Test User",
      "phone": "+254712345678",
      "address": "Pangani"
    },
    "items": [...],
    "total": 500
  }'

# Get orders
curl http://localhost:3000/api/orders
```

### Using Postman

1. Import the API collection
2. Set environment variables
3. Test each endpoint

---

## Support

For API issues:
1. Check error messages
2. Review logs in Supabase dashboard
3. Verify data types match schema
4. Test in development first

---

**Last Updated**: February 2024  
**API Version**: 1.0  
**Maintained by**: Wadi Hadramout Team
