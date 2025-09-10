-- Development Seed Data for TAPANGO
-- Insert sample data for development and testing
-- This file should only be run in development/testing environments

BEGIN;

-- Insert sample users (profiles)
INSERT INTO profiles (id, email, first_name, last_name, phone, role, address_line1, city, state, postal_code, is_verified) VALUES
-- Admins
('a0000000-0000-0000-0000-000000000001', 'admin@tapango.com', 'John', 'Administrator', '+1-555-0101', 'admin', '123 Admin St', 'San Francisco', 'CA', '94102', true),

-- Drivers
('d0000000-0000-0000-0000-000000000001', 'driver1@tapango.com', 'Mike', 'Johnson', '+1-555-0201', 'driver', '456 Driver Ave', 'Oakland', 'CA', '94601', true),
('d0000000-0000-0000-0000-000000000002', 'driver2@tapango.com', 'Sarah', 'Williams', '+1-555-0202', 'driver', '789 Trucker Blvd', 'San Jose', 'CA', '95101', true),
('d0000000-0000-0000-0000-000000000003', 'driver3@tapango.com', 'Carlos', 'Rodriguez', '+1-555-0203', 'driver', '321 Delivery Ln', 'Fremont', 'CA', '94536', true),

-- Customers
('c0000000-0000-0000-0000-000000000001', 'customer1@tapango.com', 'Alice', 'Smith', '+1-555-0301', 'customer', '111 Customer St', 'San Francisco', 'CA', '94103', true),
('c0000000-0000-0000-0000-000000000002', 'customer2@tapango.com', 'Bob', 'Brown', '+1-555-0302', 'customer', '222 Client Ave', 'Berkeley', 'CA', '94702', true),
('c0000000-0000-0000-0000-000000000003', 'customer3@tapango.com', 'Carol', 'Davis', '+1-555-0303', 'customer', '333 Buyer Blvd', 'Palo Alto', 'CA', '94301', true),

-- Dispatchers
('p0000000-0000-0000-0000-000000000001', 'dispatch@tapango.com', 'David', 'Dispatcher', '+1-555-0401', 'dispatcher', '444 Control Center', 'San Francisco', 'CA', '94104', true);

-- Insert driver details
INSERT INTO drivers (id, license_number, license_expiry, insurance_number, insurance_expiry, background_check_completed, rating, total_deliveries, is_online, current_location) VALUES
('d0000000-0000-0000-0000-000000000001', 'CA-DL-123456789', '2026-12-31', 'INS-001-MIKE', '2025-06-30', true, 4.8, 145, true, ST_Point(-122.4194, 37.7749, 4326)), -- San Francisco
('d0000000-0000-0000-0000-000000000002', 'CA-DL-987654321', '2027-03-15', 'INS-002-SARAH', '2025-09-15', true, 4.9, 289, false, ST_Point(-121.8863, 37.3382, 4326)), -- San Jose
('d0000000-0000-0000-0000-000000000003', 'CA-DL-456789123', '2025-08-20', 'INS-003-CARLOS', '2025-12-01', true, 4.7, 78, true, ST_Point(-121.9886, 37.5485, 4326)); -- Fremont

-- Insert vehicles
INSERT INTO vehicles (driver_id, type, make, model, year, license_plate, capacity_weight_kg, capacity_volume_m3, insurance_number, insurance_expiry, is_active) VALUES
('d0000000-0000-0000-0000-000000000001', 'truck', 'Ford', 'Transit', 2022, 'CA-ABC123', 1500.00, 15.50, 'INS-VEH-001', '2025-12-31', true),
('d0000000-0000-0000-0000-000000000002', 'van', 'Mercedes', 'Sprinter', 2021, 'CA-XYZ789', 1200.00, 12.30, 'INS-VEH-002', '2025-12-31', true),
('d0000000-0000-0000-0000-000000000003', 'truck', 'Isuzu', 'NPR', 2023, 'CA-DEF456', 2000.00, 18.75, 'INS-VEH-003', '2025-12-31', true);

-- Insert sample orders with realistic San Francisco Bay Area addresses
INSERT INTO orders (
  customer_id, order_number, 
  pickup_address_line1, pickup_city, pickup_state, pickup_postal_code, pickup_location,
  pickup_contact_name, pickup_contact_phone, pickup_date_requested,
  delivery_address_line1, delivery_city, delivery_state, delivery_postal_code, delivery_location,
  delivery_contact_name, delivery_contact_phone, delivery_date_requested,
  package_description, package_weight_kg, package_volume_m3, package_value_usd,
  status, estimated_cost_usd, distance_km, priority
) VALUES
-- Pending orders
(
  'c0000000-0000-0000-0000-000000000001', 'ORD-2024-001',
  '123 Market St', 'San Francisco', 'CA', '94102', ST_Point(-122.3959, 37.7909, 4326),
  'Alice Smith', '+1-555-0301', '2024-12-01 09:00:00-08',
  '456 Mission St', 'San Francisco', 'CA', '94105', ST_Point(-122.3970, 37.7897, 4326),
  'Acme Corp Reception', '+1-555-9001', '2024-12-01 14:00:00-08',
  'Office supplies and documents', 25.5, 0.8, 500.00,
  'pending', 85.00, 3.2, 1
),
(
  'c0000000-0000-0000-0000-000000000002', 'ORD-2024-002',
  '789 Valencia St', 'San Francisco', 'CA', '94110', ST_Point(-122.4219, 37.7599, 4326),
  'Bob Brown', '+1-555-0302', '2024-12-01 10:00:00-08',
  '321 University Ave', 'Palo Alto', 'CA', '94301', ST_Point(-122.1430, 37.4419, 4326),
  'Tech Startup', '+1-555-9002', '2024-12-01 16:00:00-08',
  'Computer equipment', 45.0, 1.2, 2500.00,
  'confirmed', 125.00, 58.3, 2
),

-- In-progress order
(
  'c0000000-0000-0000-0000-000000000003', 'ORD-2024-003',
  '555 California St', 'San Francisco', 'CA', '94104', ST_Point(-122.4039, 37.7931, 4326),
  'Carol Davis', '+1-555-0303', '2024-11-30 08:00:00-08',
  '999 Howard St', 'San Francisco', 'CA', '94103', ST_Point(-122.4083, 37.7819, 4326),
  'SOMA Warehouse', '+1-555-9003', '2024-11-30 12:00:00-08',
  'Furniture set', 120.0, 4.5, 1200.00,
  'in_progress', 95.00, 4.8, 1
);

-- Assign drivers to some orders
UPDATE orders SET 
  driver_id = 'd0000000-0000-0000-0000-000000000002',
  vehicle_id = (SELECT id FROM vehicles WHERE driver_id = 'd0000000-0000-0000-0000-000000000002' LIMIT 1),
  status = 'assigned',
  assigned_at = NOW() - INTERVAL '2 hours'
WHERE order_number = 'ORD-2024-002';

UPDATE orders SET 
  driver_id = 'd0000000-0000-0000-0000-000000000001',
  vehicle_id = (SELECT id FROM vehicles WHERE driver_id = 'd0000000-0000-0000-0000-000000000001' LIMIT 1),
  status = 'in_progress',
  assigned_at = NOW() - INTERVAL '4 hours',
  started_at = NOW() - INTERVAL '3 hours'
WHERE order_number = 'ORD-2024-003';

-- Insert order tracking data for in-progress order
INSERT INTO order_tracking (order_id, driver_id, location, speed_kmh, heading_degrees, timestamp) 
SELECT 
  o.id, 
  o.driver_id,
  ST_Point(-122.4039 + (random() - 0.5) * 0.01, 37.7931 + (random() - 0.5) * 0.01, 4326),
  35.0 + random() * 20,
  floor(random() * 360),
  NOW() - INTERVAL '1 hour' + (i * INTERVAL '5 minutes')
FROM orders o, generate_series(1, 12) i
WHERE o.order_number = 'ORD-2024-003';

-- Insert completed order with payment
INSERT INTO orders (
  customer_id, driver_id, vehicle_id, order_number,
  pickup_address_line1, pickup_city, pickup_state, pickup_postal_code, pickup_location,
  pickup_contact_name, pickup_contact_phone, pickup_date_requested, pickup_date_actual,
  delivery_address_line1, delivery_city, delivery_state, delivery_postal_code, delivery_location,
  delivery_contact_name, delivery_contact_phone, delivery_date_requested, delivery_date_actual,
  package_description, package_weight_kg, package_volume_m3, package_value_usd,
  status, estimated_cost_usd, actual_cost_usd, distance_km, priority,
  assigned_at, started_at, completed_at
) VALUES (
  'c0000000-0000-0000-0000-000000000001', 
  'd0000000-0000-0000-0000-000000000003',
  (SELECT id FROM vehicles WHERE driver_id = 'd0000000-0000-0000-0000-000000000003' LIMIT 1),
  'ORD-2024-004',
  '100 First St', 'San Francisco', 'CA', '94105', ST_Point(-122.3976, 37.7889, 4326),
  'Alice Smith', '+1-555-0301', '2024-11-29 14:00:00-08', '2024-11-29 14:15:00-08',
  '200 Second St', 'San Francisco', 'CA', '94107', ST_Point(-122.3906, 37.7749, 4326),
  'Warehouse Manager', '+1-555-9004', '2024-11-29 16:00:00-08', '2024-11-29 15:45:00-08',
  'Electronics package', 15.2, 0.5, 800.00,
  'delivered', 75.00, 75.00, 2.1, 1,
  '2024-11-29 13:30:00-08', '2024-11-29 14:00:00-08', '2024-11-29 15:45:00-08'
);

-- Insert payments for completed order
INSERT INTO payments (order_id, customer_id, amount_usd, status, payment_method, processed_at) 
SELECT id, customer_id, 75.00, 'paid', 'card', completed_at
FROM orders WHERE order_number = 'ORD-2024-004';

-- Insert review for completed order
INSERT INTO reviews (order_id, customer_id, driver_id, rating, title, comment, is_anonymous)
SELECT o.id, o.customer_id, o.driver_id, 5, 'Excellent service!', 'Driver was professional and delivered on time. Highly recommended!', false
FROM orders o WHERE o.order_number = 'ORD-2024-004';

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, data) VALUES
('c0000000-0000-0000-0000-000000000001', 'Order Confirmed', 'Your order ORD-2024-001 has been confirmed', 'order_update', '{"order_id": "ORD-2024-001", "status": "confirmed"}'),
('c0000000-0000-0000-0000-000000000002', 'Driver Assigned', 'Sarah Williams has been assigned to your order', 'order_update', '{"order_id": "ORD-2024-002", "driver_name": "Sarah Williams"}'),
('d0000000-0000-0000-0000-000000000001', 'New Order Available', 'A new delivery order is available in your area', 'order_update', '{"order_id": "ORD-2024-003", "pickup_address": "555 California St"}'),
('c0000000-0000-0000-0000-000000000003', 'Delivery in Progress', 'Your driver is on the way to pickup location', 'order_update', '{"order_id": "ORD-2024-003", "status": "in_progress"}');

-- Update driver statistics based on completed orders
UPDATE drivers SET 
  total_deliveries = (SELECT COUNT(*) FROM orders WHERE driver_id = drivers.id AND status = 'delivered'),
  rating = (SELECT COALESCE(AVG(rating::decimal), 0) FROM reviews WHERE driver_id = drivers.id)
WHERE id IN (
  'd0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000002', 
  'd0000000-0000-0000-0000-000000000003'
);

COMMIT;
