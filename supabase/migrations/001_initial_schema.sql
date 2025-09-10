-- Tapango Full-Stack Schema
-- Comprehensive database schema with invoices, RBAC, audit logs

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Custom types
CREATE TYPE user_role AS ENUM ('customer', 'driver', 'admin', 'super_admin');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'driver_assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
CREATE TYPE invoice_status AS ENUM ('draft', 'issued', 'paid', 'overdue', 'void');
CREATE TYPE driver_status AS ENUM ('offline', 'online', 'busy', 'break');
CREATE TYPE notification_type AS ENUM ('order_update', 'driver_assigned', 'payment', 'invoice', 'system', 'marketing');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'customer',
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    address JSONB, -- {street, city, state, postal_code, country, coordinates}
    preferences JSONB DEFAULT '{}', -- User preferences and settings
    metadata JSONB DEFAULT '{}', -- Additional flexible data
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drivers table (additional driver-specific info)
CREATE TABLE drivers (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    license_number TEXT UNIQUE NOT NULL,
    license_expiry DATE,
    vehicle_info JSONB NOT NULL, -- {make, model, year, plate, color, type}
    status driver_status DEFAULT 'offline',
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    documents JSONB DEFAULT '{}', -- {license_url, insurance_url, vehicle_reg_url}
    bank_details JSONB, -- Encrypted bank account info
    is_verified BOOLEAN DEFAULT false,
    verification_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Driver locations (real-time tracking)
CREATE TABLE driver_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    heading DECIMAL(5,2), -- Direction in degrees
    speed DECIMAL(5,2), -- Speed in km/h
    accuracy DECIMAL(8,2), -- GPS accuracy in meters
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Geospatial index for location queries
    location GEOGRAPHY(POINT, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES profiles(id),
    driver_id UUID REFERENCES drivers(id),
    status order_status DEFAULT 'pending',
    
    -- Pickup and delivery details
    pickup_address JSONB NOT NULL, -- {street, city, coordinates, contact_name, contact_phone, notes}
    delivery_address JSONB NOT NULL,
    pickup_time TIMESTAMPTZ,
    delivery_time TIMESTAMPTZ,
    estimated_delivery TIMESTAMPTZ,
    
    -- Package details
    package_details JSONB NOT NULL, -- {weight, dimensions, description, special_instructions, fragile}
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    distance_price DECIMAL(10,2) DEFAULT 0,
    weight_price DECIMAL(10,2) DEFAULT 0,
    surge_multiplier DECIMAL(3,2) DEFAULT 1.00,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    
    -- Tracking
    tracking_code TEXT UNIQUE NOT NULL,
    route_data JSONB, -- GPS tracking points and route optimization
    
    -- Metadata
    notes TEXT,
    cancellation_reason TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order events (audit trail for orders)
CREATE TABLE order_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'status_change', 'location_update', 'payment', 'note_added'
    data JSONB NOT NULL, -- Event-specific data
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number TEXT UNIQUE NOT NULL, -- Auto-generated: INV-YYYY-####
    order_id UUID REFERENCES orders(id),
    customer_id UUID NOT NULL REFERENCES profiles(id),
    
    -- Invoice details
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    
    -- Line items stored as JSONB for flexibility
    line_items JSONB NOT NULL, -- [{title, quantity, unit_price, tax_rate, total}]
    
    -- Totals
    subtotal DECIMAL(10,2) NOT NULL,
    tax_total DECIMAL(10,2) DEFAULT 0,
    discount_total DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    
    -- Status and metadata
    status invoice_status DEFAULT 'draft',
    notes TEXT,
    terms TEXT,
    
    -- File references
    pdf_url TEXT, -- Signed URL to generated PDF
    
    created_by UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id),
    order_id UUID REFERENCES orders(id), -- Direct order payments
    
    -- Payment details
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status payment_status DEFAULT 'pending',
    
    -- Provider details
    provider TEXT NOT NULL, -- 'stripe', 'razorpay', 'paypal', etc.
    provider_transaction_id TEXT,
    provider_fee DECIMAL(10,2) DEFAULT 0,
    
    -- Metadata
    payment_method JSONB, -- {type: 'card', last4: '1234', brand: 'visa'}
    receipt_url TEXT,
    failure_reason TEXT,
    
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    
    -- Payload for deep linking and actions
    payload JSONB DEFAULT '{}', -- {order_id, invoice_id, action_url, etc.}
    
    -- Delivery tracking
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    
    -- Push notification tracking
    push_sent BOOLEAN DEFAULT false,
    push_sent_at TIMESTAMPTZ,
    push_delivery_status TEXT, -- 'sent', 'delivered', 'failed'
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Push tokens (for OneSignal integration)
CREATE TABLE push_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    platform TEXT NOT NULL, -- 'ios', 'android', 'web'
    device_info JSONB DEFAULT '{}', -- {model, os_version, app_version}
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, token)
);

-- App settings (feature flags and configuration)
CREATE TABLE app_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    scope TEXT DEFAULT 'global', -- 'global', 'development', 'production'
    is_public BOOLEAN DEFAULT false, -- Can be exposed to client
    updated_by UUID REFERENCES profiles(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit logs (track important changes)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT NOT NULL,
    row_id UUID NOT NULL,
    action TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    old_values JSONB,
    new_values JSONB,
    changed_by UUID REFERENCES profiles(id),
    changed_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Create indexes for performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_driver_locations_driver_id ON driver_locations(driver_id);
CREATE INDEX idx_driver_locations_updated_at ON driver_locations(updated_at);
CREATE INDEX idx_driver_locations_spatial ON driver_locations USING GIST(location);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_driver_id ON orders(driver_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_tracking_code ON orders(tracking_code);
CREATE INDEX idx_order_events_order_id ON order_events(order_id);
CREATE INDEX idx_order_events_created_at ON order_events(created_at);
CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_push_tokens_user_id ON push_tokens(user_id);
CREATE INDEX idx_audit_logs_table_row ON audit_logs(table_name, row_id);
CREATE INDEX idx_audit_logs_changed_at ON audit_logs(changed_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Generate tracking codes for orders
CREATE OR REPLACE FUNCTION generate_tracking_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.tracking_code IS NULL THEN
        NEW.tracking_code = 'TPN' || LPAD(EXTRACT(YEAR FROM NOW())::TEXT, 4, '0') || 
                           LPAD(EXTRACT(DOY FROM NOW())::TEXT, 3, '0') || 
                           LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER generate_order_tracking_code 
    BEFORE INSERT ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION generate_tracking_code();

-- Generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.invoice_number IS NULL THEN
        NEW.invoice_number = 'INV-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || 
                            LPAD(NEXTVAL('invoice_number_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE SEQUENCE invoice_number_seq START 1;
CREATE TRIGGER generate_invoice_number_trigger 
    BEFORE INSERT ON invoices 
    FOR EACH ROW 
    EXECUTE FUNCTION generate_invoice_number();
