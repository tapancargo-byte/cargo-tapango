-- TapanGo Database Migration
-- Run this in your Supabase SQL Editor: https://ehlzbibwyqxowhwxpuoh.supabase.co/project/ehlzbibwyqxowhwxpuoh/sql/new

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
    address JSONB,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drivers table (additional driver-specific info)
CREATE TABLE drivers (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    license_number TEXT UNIQUE NOT NULL,
    license_expiry DATE,
    vehicle_info JSONB NOT NULL,
    status driver_status DEFAULT 'offline',
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    documents JSONB DEFAULT '{}',
    bank_details JSONB,
    is_verified BOOLEAN DEFAULT false,
    verification_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES profiles(id),
    driver_id UUID REFERENCES drivers(id),
    status order_status DEFAULT 'pending',
    pickup_address JSONB NOT NULL,
    delivery_address JSONB NOT NULL,
    pickup_time TIMESTAMPTZ,
    delivery_time TIMESTAMPTZ,
    estimated_delivery TIMESTAMPTZ,
    package_details JSONB NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    distance_price DECIMAL(10,2) DEFAULT 0,
    weight_price DECIMAL(10,2) DEFAULT 0,
    surge_multiplier DECIMAL(3,2) DEFAULT 1.00,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    tracking_code TEXT UNIQUE NOT NULL,
    route_data JSONB,
    notes TEXT,
    cancellation_reason TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order events (audit trail)
CREATE TABLE order_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    data JSONB NOT NULL,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number TEXT UNIQUE NOT NULL,
    order_id UUID REFERENCES orders(id),
    customer_id UUID NOT NULL REFERENCES profiles(id),
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    line_items JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_total DECIMAL(10,2) DEFAULT 0,
    discount_total DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status invoice_status DEFAULT 'draft',
    notes TEXT,
    terms TEXT,
    pdf_url TEXT,
    created_by UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id),
    order_id UUID REFERENCES orders(id),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status payment_status DEFAULT 'pending',
    provider TEXT NOT NULL,
    provider_transaction_id TEXT,
    provider_fee DECIMAL(10,2) DEFAULT 0,
    payment_method JSONB,
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
    payload JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    push_sent BOOLEAN DEFAULT false,
    push_sent_at TIMESTAMPTZ,
    push_delivery_status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Push tokens (for OneSignal integration)
CREATE TABLE push_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    platform TEXT NOT NULL,
    device_info JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, token)
);

-- Create indexes for performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_driver_id ON orders(driver_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_tracking_code ON orders(tracking_code);
CREATE INDEX idx_order_events_order_id ON order_events(order_id);
CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_push_tokens_user_id ON push_tokens(user_id);

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
CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1;

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

CREATE TRIGGER generate_invoice_number_trigger 
    BEFORE INSERT ON invoices 
    FOR EACH ROW 
    EXECUTE FUNCTION generate_invoice_number();

-- Create RLS policies for security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (users can only see their own data)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Drivers can view own data" ON drivers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Drivers can update own data" ON drivers FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = customer_id OR auth.uid() IN (SELECT id FROM drivers WHERE id = orders.driver_id));
CREATE POLICY "Customers can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Drivers can update assigned orders" ON orders FOR UPDATE USING (auth.uid() IN (SELECT id FROM drivers WHERE id = orders.driver_id));

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own push tokens" ON push_tokens FOR ALL USING (auth.uid() = user_id);
