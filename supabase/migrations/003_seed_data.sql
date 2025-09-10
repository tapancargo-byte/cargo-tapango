-- Seed data for development and testing
-- This creates sample data for all tables

-- Insert app settings (feature flags and configuration)
INSERT INTO app_settings (key, value, description, scope, is_public) VALUES
('feature_flags', '{"use_supabase_auth": true, "use_supabase_orders": true, "use_supabase_drivers": false, "use_supabase_notifications": false}', 'Feature flags for gradual migration', 'development', true),
('pricing_config', '{"base_rate": 5.00, "per_km_rate": 1.50, "per_kg_rate": 0.50, "surge_multiplier_max": 2.0, "tax_rate": 0.08}', 'Pricing configuration', 'global', false),
('app_config', '{"max_order_weight": 50, "max_delivery_distance": 100, "support_email": "support@tapango.com", "support_phone": "+1-555-0123"}', 'General app configuration', 'global', true),
('notification_templates', '{"order_created": {"title": "Order Confirmed", "body": "Your order #{tracking_code} has been confirmed"}, "driver_assigned": {"title": "Driver Assigned", "body": "Driver {driver_name} is on the way"}}', 'Push notification templates', 'global', false);

-- Insert sample profiles (these would normally be created via auth.users)
-- Note: In real usage, these would be created when users sign up
INSERT INTO profiles (id, role, name, email, phone, address, preferences) VALUES
-- Customers
('11111111-1111-1111-1111-111111111111', 'customer', 'John Doe', 'john.doe@example.com', '+1-555-0101', 
 '{"street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "country": "USA", "coordinates": {"lat": 40.7128, "lng": -74.0060}}',
 '{"notifications": {"push": true, "email": true, "sms": false}, "language": "en", "currency": "USD"}'),
 
('22222222-2222-2222-2222-222222222222', 'customer', 'Jane Smith', 'jane.smith@example.com', '+1-555-0102',
 '{"street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "USA", "coordinates": {"lat": 34.0522, "lng": -118.2437}}',
 '{"notifications": {"push": true, "email": true, "sms": true}, "language": "en", "currency": "USD"}'),

-- Drivers
('33333333-3333-3333-3333-333333333333', 'driver', 'Mike Johnson', 'mike.johnson@example.com', '+1-555-0201',
 '{"street": "789 Pine St", "city": "New York", "state": "NY", "postal_code": "10002", "country": "USA", "coordinates": {"lat": 40.7589, "lng": -73.9851}}',
 '{"notifications": {"push": true, "email": true, "sms": true}, "language": "en", "currency": "USD"}'),
 
('44444444-4444-4444-4444-444444444444', 'driver', 'Sarah Wilson', 'sarah.wilson@example.com', '+1-555-0202',
 '{"street": "321 Elm Dr", "city": "Los Angeles", "state": "CA", "postal_code": "90211", "country": "USA", "coordinates": {"lat": 34.0736, "lng": -118.4004}}',
 '{"notifications": {"push": true, "email": true, "sms": true}, "language": "en", "currency": "USD"}'),

-- Admins
('55555555-5555-5555-5555-555555555555', 'admin', 'Admin User', 'admin@tapango.com', '+1-555-0301',
 '{"street": "100 Admin Blvd", "city": "San Francisco", "state": "CA", "postal_code": "94102", "country": "USA", "coordinates": {"lat": 37.7749, "lng": -122.4194}}',
 '{"notifications": {"push": true, "email": true, "sms": false}, "language": "en", "currency": "USD"}'),

('66666666-6666-6666-6666-666666666666', 'super_admin', 'Super Admin', 'superadmin@tapango.com', '+1-555-0302',
 '{"street": "200 Super St", "city": "San Francisco", "state": "CA", "postal_code": "94103", "country": "USA", "coordinates": {"lat": 37.7849, "lng": -122.4094}}',
 '{"notifications": {"push": true, "email": true, "sms": true}, "language": "en", "currency": "USD"}');

-- Insert driver details
INSERT INTO drivers (id, license_number, license_expiry, vehicle_info, status, rating, total_ratings, is_verified) VALUES
('33333333-3333-3333-3333-333333333333', 'NY123456789', '2025-12-31',
 '{"make": "Toyota", "model": "Camry", "year": 2020, "plate": "ABC123", "color": "Blue", "type": "sedan"}',
 'online', 4.8, 127, true),
 
('44444444-4444-4444-4444-444444444444', 'CA987654321', '2026-06-15',
 '{"make": "Honda", "model": "CR-V", "year": 2021, "plate": "XYZ789", "color": "White", "type": "suv"}',
 'online', 4.9, 203, true);

-- Insert driver locations
INSERT INTO driver_locations (driver_id, latitude, longitude, heading, speed) VALUES
('33333333-3333-3333-3333-333333333333', 40.7589, -73.9851, 45.0, 25.5),
('44444444-4444-4444-4444-444444444444', 34.0736, -118.4004, 180.0, 30.2);

-- Insert sample orders
INSERT INTO orders (id, customer_id, driver_id, status, pickup_address, delivery_address, package_details, base_price, total_price, tracking_code) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'in_transit',
 '{"street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "coordinates": {"lat": 40.7128, "lng": -74.0060}, "contact_name": "John Doe", "contact_phone": "+1-555-0101", "notes": "Apartment 5B"}',
 '{"street": "789 Broadway", "city": "New York", "state": "NY", "postal_code": "10003", "coordinates": {"lat": 40.7282, "lng": -73.9942}, "contact_name": "Business Center", "contact_phone": "+1-555-0199", "notes": "Reception desk"}',
 '{"weight": 2.5, "dimensions": {"length": 30, "width": 20, "height": 15}, "description": "Electronics package", "special_instructions": "Handle with care", "fragile": true}',
 15.00, 18.50, 'TPN202500112001'),

('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', 'delivered',
 '{"street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "coordinates": {"lat": 34.0522, "lng": -118.2437}, "contact_name": "Jane Smith", "contact_phone": "+1-555-0102", "notes": "House with blue door"}',
 '{"street": "123 Sunset Blvd", "city": "Los Angeles", "state": "CA", "postal_code": "90028", "coordinates": {"lat": 34.0928, "lng": -118.3287}, "contact_name": "Restaurant", "contact_phone": "+1-555-0288", "notes": "Back entrance"}',
 '{"weight": 1.0, "dimensions": {"length": 25, "width": 25, "height": 10}, "description": "Documents", "special_instructions": "Urgent delivery", "fragile": false}',
 12.00, 14.75, 'TPN202500112002'),

('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', NULL, 'pending',
 '{"street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "coordinates": {"lat": 40.7128, "lng": -74.0060}, "contact_name": "John Doe", "contact_phone": "+1-555-0101", "notes": "Apartment 5B"}',
 '{"street": "555 5th Ave", "city": "New York", "state": "NY", "postal_code": "10017", "coordinates": {"lat": 40.7505, "lng": -73.9934}, "contact_name": "Office Building", "contact_phone": "+1-555-0177", "notes": "Floor 15, Suite 1501"}',
 '{"weight": 5.0, "dimensions": {"length": 40, "width": 30, "height": 20}, "description": "Books and supplies", "special_instructions": "Heavy package", "fragile": false}',
 20.00, 25.60, 'TPN202500112003');

-- Insert order events
INSERT INTO order_events (order_id, type, data, created_by) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'status_change', '{"from": "pending", "to": "confirmed", "timestamp": "2025-01-12T10:00:00Z"}', '11111111-1111-1111-1111-111111111111'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'status_change', '{"from": "confirmed", "to": "driver_assigned", "driver_id": "33333333-3333-3333-3333-333333333333", "timestamp": "2025-01-12T10:15:00Z"}', '55555555-5555-5555-5555-555555555555'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'status_change', '{"from": "driver_assigned", "to": "picked_up", "timestamp": "2025-01-12T11:00:00Z"}', '33333333-3333-3333-3333-333333333333'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'status_change', '{"from": "picked_up", "to": "in_transit", "timestamp": "2025-01-12T11:15:00Z"}', '33333333-3333-3333-3333-333333333333'),

('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'status_change', '{"from": "pending", "to": "confirmed", "timestamp": "2025-01-11T14:00:00Z"}', '22222222-2222-2222-2222-222222222222'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'status_change', '{"from": "confirmed", "to": "driver_assigned", "driver_id": "44444444-4444-4444-4444-444444444444", "timestamp": "2025-01-11T14:20:00Z"}', '55555555-5555-5555-5555-555555555555'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'status_change', '{"from": "driver_assigned", "to": "delivered", "timestamp": "2025-01-11T15:45:00Z"}', '44444444-4444-4444-4444-444444444444');

-- Insert sample invoices
INSERT INTO invoices (id, invoice_number, order_id, customer_id, line_items, subtotal, tax_total, total_amount, status, created_by) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'INV-2025-0001', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222',
 '[{"title": "Delivery Service", "quantity": 1, "unit_price": 12.00, "tax_rate": 0.08, "total": 12.00}, {"title": "Fuel Surcharge", "quantity": 1, "unit_price": 1.50, "tax_rate": 0.08, "total": 1.50}]',
 13.50, 1.08, 14.58, 'paid', '55555555-5555-5555-5555-555555555555'),

('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'INV-2025-0002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111',
 '[{"title": "Delivery Service", "quantity": 1, "unit_price": 15.00, "tax_rate": 0.08, "total": 15.00}, {"title": "Handling Fee", "quantity": 1, "unit_price": 2.00, "tax_rate": 0.08, "total": 2.00}]',
 17.00, 1.36, 18.36, 'issued', '55555555-5555-5555-5555-555555555555');

-- Insert sample payments
INSERT INTO payments (id, invoice_id, order_id, amount, status, provider, provider_transaction_id, payment_method, processed_at) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 14.58, 'completed', 'stripe', 'pi_1234567890', 
 '{"type": "card", "last4": "4242", "brand": "visa", "exp_month": 12, "exp_year": 2026}', '2025-01-11T16:00:00Z');

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, payload, is_read) VALUES
('11111111-1111-1111-1111-111111111111', 'order_update', 'Order In Transit', 'Your order TPN202500112001 is now in transit', '{"order_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "tracking_code": "TPN202500112001"}', false),
('11111111-1111-1111-1111-111111111111', 'driver_assigned', 'Driver Assigned', 'Mike Johnson has been assigned to your order', '{"order_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "driver_id": "33333333-3333-3333-3333-333333333333"}', true),
('22222222-2222-2222-2222-222222222222', 'order_update', 'Order Delivered', 'Your order TPN202500112002 has been delivered', '{"order_id": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "tracking_code": "TPN202500112002"}', true),
('22222222-2222-2222-2222-222222222222', 'invoice', 'Invoice Ready', 'Invoice INV-2025-0001 is ready for payment', '{"invoice_id": "dddddddd-dddd-dddd-dddd-dddddddddddd", "invoice_number": "INV-2025-0001"}', false),
('33333333-3333-3333-3333-333333333333', 'order_update', 'New Order Assigned', 'You have been assigned order TPN202500112001', '{"order_id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "tracking_code": "TPN202500112001"}', true);

-- Insert sample push tokens
INSERT INTO push_tokens (user_id, token, platform, device_info) VALUES
('11111111-1111-1111-1111-111111111111', 'ExponentPushToken[customer1_ios_token]', 'ios', '{"model": "iPhone 13", "os_version": "15.0", "app_version": "1.0.0"}'),
('22222222-2222-2222-2222-222222222222', 'ExponentPushToken[customer2_android_token]', 'android', '{"model": "Samsung Galaxy S21", "os_version": "12.0", "app_version": "1.0.0"}'),
('33333333-3333-3333-3333-333333333333', 'ExponentPushToken[driver1_ios_token]', 'ios', '{"model": "iPhone 12", "os_version": "15.1", "app_version": "1.0.0"}'),
('44444444-4444-4444-4444-444444444444', 'ExponentPushToken[driver2_android_token]', 'android', '{"model": "Google Pixel 6", "os_version": "12.0", "app_version": "1.0.0"}'),
('55555555-5555-5555-5555-555555555555', 'web_push_token_admin_1', 'web', '{"browser": "Chrome", "os": "macOS", "app_version": "1.0.0"}')
