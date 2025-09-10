-- Enhanced tracking and booking schema updates
-- Migration: 006_enhanced_tracking_schema.sql
-- Description: Add enhanced tracking capabilities, real-time location updates, and improved booking data

-- Add columns to orders table for enhanced tracking
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS transport_mode VARCHAR(20) DEFAULT 'truck',
ADD COLUMN IF NOT EXISTS route_key VARCHAR(50),
ADD COLUMN IF NOT EXISTS estimated_distance_km DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS estimated_duration_minutes INTEGER,
ADD COLUMN IF NOT EXISTS declared_value DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS cargo_dimensions JSONB,
ADD COLUMN IF NOT EXISTS pickup_coordinates POINT,
ADD COLUMN IF NOT EXISTS delivery_coordinates POINT,
ADD COLUMN IF NOT EXISTS current_location POINT,
ADD COLUMN IF NOT EXISTS driver_notes TEXT,
ADD COLUMN IF NOT EXISTS customer_notes TEXT,
ADD COLUMN IF NOT EXISTS special_instructions TEXT;

-- Create index for transport mode and route queries
CREATE INDEX IF NOT EXISTS idx_orders_transport_mode ON orders(transport_mode);
CREATE INDEX IF NOT EXISTS idx_orders_route_key ON orders(route_key);

-- Create real-time driver locations table
CREATE TABLE IF NOT EXISTS driver_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  accuracy DECIMAL(6, 2),
  speed DECIMAL(6, 2),
  heading DECIMAL(5, 2),
  altitude DECIMAL(8, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for driver locations
CREATE INDEX IF NOT EXISTS idx_driver_locations_driver_id ON driver_locations(driver_id);
CREATE INDEX IF NOT EXISTS idx_driver_locations_order_id ON driver_locations(order_id);
CREATE INDEX IF NOT EXISTS idx_driver_locations_updated_at ON driver_locations(updated_at DESC);

-- Create composite index for efficient queries
CREATE INDEX IF NOT EXISTS idx_driver_locations_driver_order ON driver_locations(driver_id, order_id, updated_at DESC);

-- Create route tracking table for historical route data
CREATE TABLE IF NOT EXISTS route_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  route_points JSONB NOT NULL,
  total_distance_km DECIMAL(10,2),
  total_duration_minutes INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for route tracking
CREATE INDEX IF NOT EXISTS idx_route_tracking_order_id ON route_tracking(order_id);
CREATE INDEX IF NOT EXISTS idx_route_tracking_driver_id ON route_tracking(driver_id);

-- Enhanced order events table with location data
ALTER TABLE order_events 
ADD COLUMN IF NOT EXISTS location POINT,
ADD COLUMN IF NOT EXISTS metadata JSONB,
ADD COLUMN IF NOT EXISTS driver_id UUID REFERENCES profiles(id);

-- Create index for order events with location
CREATE INDEX IF NOT EXISTS idx_order_events_location ON order_events USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_order_events_driver_id ON order_events(driver_id);

-- Create real-time notifications table
CREATE TABLE IF NOT EXISTS real_time_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  notification_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON real_time_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_order_id ON real_time_notifications(order_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON real_time_notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON real_time_notifications(user_id, is_read, created_at DESC);

-- Create function to update driver location
CREATE OR REPLACE FUNCTION update_driver_location(
  p_driver_id UUID,
  p_order_id UUID DEFAULT NULL,
  p_latitude DECIMAL,
  p_longitude DECIMAL,
  p_accuracy DECIMAL DEFAULT NULL,
  p_speed DECIMAL DEFAULT NULL,
  p_heading DECIMAL DEFAULT NULL,
  p_altitude DECIMAL DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  location_id UUID;
BEGIN
  -- Insert or update driver location
  INSERT INTO driver_locations (
    driver_id, order_id, latitude, longitude, 
    accuracy, speed, heading, altitude, updated_at
  ) VALUES (
    p_driver_id, p_order_id, p_latitude, p_longitude,
    p_accuracy, p_speed, p_heading, p_altitude, NOW()
  ) RETURNING id INTO location_id;

  -- Update current location in orders table if order_id provided
  IF p_order_id IS NOT NULL THEN
    UPDATE orders 
    SET current_location = POINT(p_longitude, p_latitude),
        updated_at = NOW()
    WHERE id = p_order_id AND driver_id = p_driver_id;
  END IF;

  RETURN location_id;
END;
$$;

-- Create function to track route progress
CREATE OR REPLACE FUNCTION track_route_progress(
  p_order_id UUID,
  p_driver_id UUID,
  p_route_points JSONB,
  p_distance_km DECIMAL DEFAULT NULL,
  p_duration_minutes INTEGER DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  tracking_id UUID;
BEGIN
  -- Insert or update route tracking
  INSERT INTO route_tracking (
    order_id, driver_id, route_points, 
    total_distance_km, total_duration_minutes
  ) VALUES (
    p_order_id, p_driver_id, p_route_points,
    p_distance_km, p_duration_minutes
  ) 
  ON CONFLICT (order_id) DO UPDATE SET
    route_points = EXCLUDED.route_points,
    total_distance_km = EXCLUDED.total_distance_km,
    total_duration_minutes = EXCLUDED.total_duration_minutes,
    completed_at = CASE 
      WHEN EXCLUDED.total_distance_km IS NOT NULL THEN NOW()
      ELSE route_tracking.completed_at
    END
  RETURNING id INTO tracking_id;

  RETURN tracking_id;
END;
$$;

-- Create function to send real-time notification
CREATE OR REPLACE FUNCTION send_real_time_notification(
  p_user_id UUID,
  p_order_id UUID,
  p_notification_type VARCHAR(50),
  p_title VARCHAR(255),
  p_message TEXT,
  p_data JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO real_time_notifications (
    user_id, order_id, notification_type, title, message, data
  ) VALUES (
    p_user_id, p_order_id, p_notification_type, p_title, p_message, p_data
  ) RETURNING id INTO notification_id;

  RETURN notification_id;
END;
$$;

-- Create trigger function for automatic notifications
CREATE OR REPLACE FUNCTION trigger_order_status_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Send notification to customer when order status changes
  IF OLD.status != NEW.status THEN
    PERFORM send_real_time_notification(
      NEW.customer_id,
      NEW.id,
      'order_status_changed',
      'Order Status Updated',
      'Your order ' || NEW.tracking_code || ' status changed to ' || NEW.status,
      jsonb_build_object(
        'order_id', NEW.id,
        'old_status', OLD.status,
        'new_status', NEW.status,
        'tracking_code', NEW.tracking_code
      )
    );

    -- Send notification to driver if assigned
    IF NEW.driver_id IS NOT NULL THEN
      PERFORM send_real_time_notification(
        NEW.driver_id,
        NEW.id,
        'order_status_changed',
        'Job Status Updated',
        'Order ' || NEW.tracking_code || ' status changed to ' || NEW.status,
        jsonb_build_object(
          'order_id', NEW.id,
          'old_status', OLD.status,
          'new_status', NEW.status,
          'tracking_code', NEW.tracking_code
        )
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for order status changes
DROP TRIGGER IF EXISTS trigger_order_status_notification ON orders;
CREATE TRIGGER trigger_order_status_notification
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION trigger_order_status_notification();

-- Update RLS policies for new tables

-- Driver locations policies
ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers can manage their own location data"
  ON driver_locations FOR ALL
  USING (auth.uid() = driver_id);

CREATE POLICY "Customers can view driver location for their orders"
  ON driver_locations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = driver_locations.order_id 
      AND orders.customer_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all driver locations"
  ON driver_locations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Route tracking policies
ALTER TABLE route_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Drivers can manage route tracking for their orders"
  ON route_tracking FOR ALL
  USING (auth.uid() = driver_id);

CREATE POLICY "Customers can view route tracking for their orders"
  ON route_tracking FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = route_tracking.order_id 
      AND orders.customer_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all route tracking"
  ON route_tracking FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Real-time notifications policies
ALTER TABLE real_time_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own notifications"
  ON real_time_notifications FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications"
  ON real_time_notifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Create indexes for better performance on spatial queries
CREATE INDEX IF NOT EXISTS idx_orders_pickup_coordinates ON orders USING GIST(pickup_coordinates);
CREATE INDEX IF NOT EXISTS idx_orders_delivery_coordinates ON orders USING GIST(delivery_coordinates);
CREATE INDEX IF NOT EXISTS idx_orders_current_location ON orders USING GIST(current_location);

-- Add constraint checks for transport modes
ALTER TABLE orders 
ADD CONSTRAINT check_transport_mode 
CHECK (transport_mode IN ('air', 'truck', 'bike', 'train', 'ship'));

-- Add constraint checks for route keys
ALTER TABLE orders 
ADD CONSTRAINT check_route_key 
CHECK (route_key IN ('imphal_delhi', 'delhi_imphal', 'local_imphal', 'local_delhi'));

-- Update existing orders with default values where needed
UPDATE orders 
SET transport_mode = 'truck'
WHERE transport_mode IS NULL;

UPDATE orders 
SET route_key = 'imphal_delhi'
WHERE route_key IS NULL AND pickup_city = 'Imphal' AND delivery_city = 'Delhi';

UPDATE orders 
SET route_key = 'delhi_imphal'
WHERE route_key IS NULL AND pickup_city = 'Delhi' AND delivery_city = 'Imphal';

UPDATE orders 
SET route_key = 'local_imphal'
WHERE route_key IS NULL AND pickup_city = 'Imphal' AND delivery_city = 'Imphal';

UPDATE orders 
SET route_key = 'local_delhi'
WHERE route_key IS NULL AND pickup_city = 'Delhi' AND delivery_city = 'Delhi';

-- Create view for enhanced order tracking
CREATE OR REPLACE VIEW enhanced_order_tracking AS
SELECT 
  o.id,
  o.tracking_code,
  o.status,
  o.transport_mode,
  o.route_key,
  o.pickup_address,
  o.delivery_address,
  o.pickup_coordinates,
  o.delivery_coordinates,
  o.current_location,
  o.estimated_distance_km,
  o.estimated_duration_minutes,
  o.declared_value,
  o.cargo_description,
  o.cargo_weight,
  o.cargo_dimensions,
  o.created_at,
  o.updated_at,
  p.first_name || ' ' || p.last_name as customer_name,
  p.email as customer_email,
  p.phone as customer_phone,
  d.first_name || ' ' || d.last_name as driver_name,
  d.email as driver_email,
  d.phone as driver_phone,
  dl.latitude as current_lat,
  dl.longitude as current_lng,
  dl.updated_at as location_updated_at
FROM orders o
LEFT JOIN profiles p ON o.customer_id = p.id
LEFT JOIN profiles d ON o.driver_id = d.id
LEFT JOIN LATERAL (
  SELECT latitude, longitude, updated_at 
  FROM driver_locations 
  WHERE driver_id = o.driver_id 
  AND order_id = o.id
  ORDER BY updated_at DESC 
  LIMIT 1
) dl ON TRUE;

-- Grant permissions for the view
GRANT SELECT ON enhanced_order_tracking TO authenticated;

-- Create function to get nearby drivers
CREATE OR REPLACE FUNCTION get_nearby_drivers(
  p_latitude DECIMAL,
  p_longitude DECIMAL,
  p_radius_km DECIMAL DEFAULT 10
)
RETURNS TABLE (
  driver_id UUID,
  driver_name TEXT,
  distance_km DECIMAL,
  last_seen TIMESTAMPTZ,
  is_available BOOLEAN
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    p.id as driver_id,
    p.first_name || ' ' || p.last_name as driver_name,
    ST_Distance(
      ST_GeographyFromText('POINT(' || p_longitude || ' ' || p_latitude || ')'),
      ST_GeographyFromText('POINT(' || dl.longitude || ' ' || dl.latitude || ')')
    ) / 1000 as distance_km,
    dl.updated_at as last_seen,
    CASE 
      WHEN EXISTS (
        SELECT 1 FROM orders 
        WHERE driver_id = p.id 
        AND status IN ('assigned', 'picked_up', 'in_transit')
      ) THEN FALSE
      ELSE TRUE
    END as is_available
  FROM profiles p
  JOIN LATERAL (
    SELECT latitude, longitude, updated_at 
    FROM driver_locations 
    WHERE driver_id = p.id 
    ORDER BY updated_at DESC 
    LIMIT 1
  ) dl ON TRUE
  WHERE p.role = 'driver'
  AND ST_Distance(
    ST_GeographyFromText('POINT(' || p_longitude || ' ' || p_latitude || ')'),
    ST_GeographyFromText('POINT(' || dl.longitude || ' ' || dl.latitude || ')')
  ) / 1000 <= p_radius_km
  AND dl.updated_at > NOW() - INTERVAL '30 minutes'
  ORDER BY distance_km ASC;
$$;

-- Add comment to document the migration
COMMENT ON TABLE driver_locations IS 'Real-time driver location tracking for enhanced order monitoring';
COMMENT ON TABLE route_tracking IS 'Historical route data and progress tracking for completed orders';
COMMENT ON TABLE real_time_notifications IS 'Real-time notifications for order updates and driver communications';
