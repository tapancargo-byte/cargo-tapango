# TAPANGO API Documentation

## Overview

The TAPANGO API is built on Supabase and provides RESTful endpoints for the cargo logistics platform. All API communication uses JSON format and requires authentication.

## Base URL

```
https://your-project-id.supabase.co/rest/v1
```

## Authentication

All API requests require authentication using JWT tokens obtained through Supabase Auth.

### Headers
```http
Authorization: Bearer <your-jwt-token>
apikey: <your-supabase-anon-key>
Content-Type: application/json
```

## API Endpoints

### Authentication

#### Sign Up
```http
POST /auth/v1/signup
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "data": {
    "first_name": "John",
    "last_name": "Doe",
    "role": "customer"
  }
}
```

**Response:**
```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### Sign In
```http
POST /auth/v1/token?grant_type=password
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Users & Profiles

#### Get User Profile
```http
GET /profiles?id=eq.{user_id}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "customer",
  "phone": "+1234567890",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Update Profile
```http
PATCH /profiles?id=eq.{user_id}
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890"
}
```

### Orders

#### Create Order
```http
POST /orders
```

**Request Body:**
```json
{
  "customer_id": "uuid",
  "pickup_address_line1": "123 Main St",
  "pickup_city": "San Francisco",
  "pickup_state": "CA",
  "pickup_postal_code": "94102",
  "pickup_contact_name": "John Doe",
  "pickup_contact_phone": "+1234567890",
  "pickup_date_requested": "2024-12-01T09:00:00Z",
  "delivery_address_line1": "456 Market St",
  "delivery_city": "San Francisco", 
  "delivery_state": "CA",
  "delivery_postal_code": "94105",
  "delivery_contact_name": "Jane Smith",
  "delivery_contact_phone": "+1987654321",
  "delivery_date_requested": "2024-12-01T17:00:00Z",
  "package_description": "Documents",
  "package_weight_kg": 5.0,
  "package_value_usd": 100.0
}
```

**Response:**
```json
{
  "id": "uuid",
  "order_number": "ORD-2024-001",
  "status": "pending",
  "estimated_cost_usd": 25.00,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Get Orders
```http
GET /orders?customer_id=eq.{user_id}
```

**Query Parameters:**
- `status` - Filter by order status
- `order` - Sort orders (e.g., `created_at.desc`)
- `limit` - Limit number of results
- `offset` - Pagination offset

**Response:**
```json
[
  {
    "id": "uuid",
    "order_number": "ORD-2024-001",
    "status": "pending",
    "pickup_address_line1": "123 Main St",
    "delivery_address_line1": "456 Market St",
    "estimated_cost_usd": 25.00,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Order Details
```http
GET /orders?id=eq.{order_id}&select=*,driver:drivers(*)
```

#### Update Order Status
```http
PATCH /orders?id=eq.{order_id}
```

**Request Body:**
```json
{
  "status": "in_progress",
  "started_at": "2024-01-01T10:00:00Z"
}
```

### Drivers

#### Get Available Drivers
```http
GET /drivers?is_online=eq.true&select=*,profile:profiles(*)
```

#### Update Driver Location
```http
PATCH /drivers?id=eq.{driver_id}
```

**Request Body:**
```json
{
  "current_location": "POINT(-122.4194 37.7749)",
  "last_location_update": "2024-01-01T12:00:00Z"
}
```

### Order Tracking

#### Add Tracking Point
```http
POST /order_tracking
```

**Request Body:**
```json
{
  "order_id": "uuid",
  "driver_id": "uuid",
  "location": "POINT(-122.4194 37.7749)",
  "speed_kmh": 45.5,
  "heading_degrees": 180
}
```

#### Get Order Tracking
```http
GET /order_tracking?order_id=eq.{order_id}&order=timestamp.desc
```

**Response:**
```json
[
  {
    "id": "uuid",
    "location": "POINT(-122.4194 37.7749)",
    "speed_kmh": 45.5,
    "heading_degrees": 180,
    "timestamp": "2024-01-01T12:00:00Z"
  }
]
```

### Payments

#### Create Payment
```http
POST /payments
```

**Request Body:**
```json
{
  "order_id": "uuid",
  "customer_id": "uuid",
  "amount_usd": 25.00,
  "payment_method": "card"
}
```

#### Get Payment History
```http
GET /payments?customer_id=eq.{user_id}&order=created_at.desc
```

### Reviews

#### Create Review
```http
POST /reviews
```

**Request Body:**
```json
{
  "order_id": "uuid",
  "customer_id": "uuid",
  "driver_id": "uuid",
  "rating": 5,
  "title": "Excellent service!",
  "comment": "Driver was professional and on time."
}
```

#### Get Driver Reviews
```http
GET /reviews?driver_id=eq.{driver_id}&is_anonymous=eq.false&order=created_at.desc
```

### Notifications

#### Get User Notifications
```http
GET /notifications?user_id=eq.{user_id}&order=created_at.desc
```

#### Mark Notification as Read
```http
PATCH /notifications?id=eq.{notification_id}
```

**Request Body:**
```json
{
  "read_at": "2024-01-01T12:00:00Z"
}
```

## Real-time Subscriptions

TAPANGO uses Supabase real-time subscriptions for live updates.

### Order Updates
```javascript
const subscription = supabase
  .channel('order-updates')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'orders',
    filter: `customer_id=eq.${userId}`
  }, (payload) => {
    console.log('Order update:', payload);
  })
  .subscribe();
```

### Driver Location Updates
```javascript
const subscription = supabase
  .channel('driver-location')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public', 
    table: 'drivers',
    filter: `id=eq.${driverId}`
  }, (payload) => {
    console.log('Driver location update:', payload);
  })
  .subscribe();
```

### Order Tracking Updates
```javascript
const subscription = supabase
  .channel('order-tracking')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'order_tracking',
    filter: `order_id=eq.${orderId}`
  }, (payload) => {
    console.log('New tracking point:', payload);
  })
  .subscribe();
```

## Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

### Error Response Format
```json
{
  "error": {
    "message": "Validation failed",
    "details": "Email is required",
    "code": "VALIDATION_ERROR"
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **Anonymous requests**: 100 requests per hour
- **Authenticated requests**: 1000 requests per hour
- **Admin requests**: 5000 requests per hour

## Data Types

### Geography Points
Location data uses PostGIS POINT format:
```
POINT(longitude latitude)
```

Example:
```
POINT(-122.4194 37.7749)  // San Francisco
```

### Timestamps
All timestamps use ISO 8601 format with timezone:
```
2024-01-01T12:00:00.000Z
```

### Currency
All monetary values are in USD with 2 decimal precision:
```json
{
  "amount_usd": 25.50
}
```

## Pagination

Use `limit` and `offset` parameters for pagination:

```http
GET /orders?limit=20&offset=40
```

Response includes count header:
```http
Content-Range: 0-19/100
```

## Filtering

Supabase supports various filtering operators:
- `eq` - Equal
- `neq` - Not equal  
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal
- `like` - Pattern matching
- `in` - In list

Examples:
```http
GET /orders?status=eq.pending
GET /orders?created_at=gte.2024-01-01
GET /orders?status=in.(pending,confirmed)
```

## Sorting

Use the `order` parameter:
```http
GET /orders?order=created_at.desc
GET /orders?order=status.asc,created_at.desc
```

## Code Examples

### JavaScript/TypeScript
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project-id.supabase.co',
  'your-anon-key'
);

// Create order
const { data, error } = await supabase
  .from('orders')
  .insert({
    customer_id: userId,
    pickup_address_line1: '123 Main St',
    // ... other fields
  })
  .select()
  .single();

if (error) {
  console.error('Error creating order:', error);
} else {
  console.log('Order created:', data);
}
```

### React Native with React Query
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

// Fetch orders
const { data: orders, isLoading } = useQuery({
  queryKey: ['orders', userId],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
});

// Create order mutation
const createOrderMutation = useMutation({
  mutationFn: async (orderData: CreateOrderData) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  }
});
```

## Security Considerations

### Row Level Security (RLS)
All tables use RLS policies to ensure users can only access their own data:

```sql
-- Example: Users can only view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = customer_id);
```

### Input Validation
Always validate input data both client and server-side:

```typescript
import { z } from 'zod';

const CreateOrderSchema = z.object({
  pickup_address_line1: z.string().min(1).max(255),
  pickup_city: z.string().min(1).max(100),
  package_weight_kg: z.number().positive().max(10000),
  // ... other validations
});
```

### Authentication
Always include proper authentication headers and handle auth errors:

```typescript
const { data, error } = await supabase
  .from('orders')
  .select('*');

if (error?.message === 'JWT expired') {
  // Handle token refresh
  await refreshAuthToken();
  // Retry request
}
```

## Changelog

### v1.0.0 (2024-12-01)
- Initial API release
- Order management endpoints
- User authentication
- Real-time tracking
- Payment processing
