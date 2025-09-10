-- Row Level Security (RLS) Policies
-- Comprehensive security policies for all tables

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = user_id AND role IN ('admin', 'super_admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = user_id AND role = 'super_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID DEFAULT auth.uid())
RETURNS user_role AS $$
BEGIN
    RETURN (SELECT role FROM profiles WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES TABLE POLICIES
-- Users can view their own profile, admins can view all
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id OR is_admin());

-- Users can update their own profile, admins can update any
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id OR is_admin());

-- Only admins can insert new profiles (during user creation)
CREATE POLICY "Admins can insert profiles" ON profiles
    FOR INSERT WITH CHECK (is_admin());

-- Only super admins can delete profiles
CREATE POLICY "Super admins can delete profiles" ON profiles
    FOR DELETE USING (is_super_admin());

-- DRIVERS TABLE POLICIES
-- Drivers can view their own data, customers can view basic info, admins view all
CREATE POLICY "Driver data access" ON drivers
    FOR SELECT USING (
        auth.uid() = id OR 
        is_admin() OR
        (get_user_role() = 'customer' AND is_verified = true)
    );

-- Only drivers can update their own data, admins can update any
CREATE POLICY "Drivers can update own data" ON drivers
    FOR UPDATE USING (auth.uid() = id OR is_admin());

-- Admins can insert driver records
CREATE POLICY "Admins can insert drivers" ON drivers
    FOR INSERT WITH CHECK (is_admin());

-- Only super admins can delete drivers
CREATE POLICY "Super admins can delete drivers" ON drivers
    FOR DELETE USING (is_super_admin());

-- DRIVER LOCATIONS POLICIES
-- Drivers can insert/update their own location
CREATE POLICY "Drivers can manage own location" ON driver_locations
    FOR ALL USING (
        EXISTS (SELECT 1 FROM drivers WHERE id = driver_id AND id = auth.uid()) OR
        is_admin()
    );

-- Customers can view locations of drivers assigned to their orders
-- Admins can view all locations
CREATE POLICY "Location visibility" ON driver_locations
    FOR SELECT USING (
        is_admin() OR
        EXISTS (
            SELECT 1 FROM orders o 
            WHERE o.driver_id = driver_locations.driver_id 
            AND o.customer_id = auth.uid()
            AND o.status IN ('driver_assigned', 'picked_up', 'in_transit')
        )
    );

-- ORDERS TABLE POLICIES
-- Customers can view their own orders
-- Drivers can view orders assigned to them
-- Admins can view all orders
CREATE POLICY "Order visibility" ON orders
    FOR SELECT USING (
        customer_id = auth.uid() OR
        driver_id = auth.uid() OR
        is_admin()
    );

-- Customers can create orders
-- Admins can create orders on behalf of customers
CREATE POLICY "Order creation" ON orders
    FOR INSERT WITH CHECK (
        customer_id = auth.uid() OR
        is_admin()
    );

-- Customers can update their own pending orders
-- Drivers can update assigned orders (limited fields)
-- Admins can update any order
CREATE POLICY "Order updates" ON orders
    FOR UPDATE USING (
        (customer_id = auth.uid() AND status = 'pending') OR
        (driver_id = auth.uid() AND status IN ('driver_assigned', 'picked_up', 'in_transit')) OR
        is_admin()
    );

-- Only admins can delete orders
CREATE POLICY "Admin order deletion" ON orders
    FOR DELETE USING (is_admin());

-- ORDER EVENTS POLICIES
-- Users can view events for orders they have access to
CREATE POLICY "Order events visibility" ON order_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders o 
            WHERE o.id = order_events.order_id 
            AND (o.customer_id = auth.uid() OR o.driver_id = auth.uid())
        ) OR
        is_admin()
    );

-- Users can insert events for orders they have access to
CREATE POLICY "Order events creation" ON order_events
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders o 
            WHERE o.id = order_id 
            AND (o.customer_id = auth.uid() OR o.driver_id = auth.uid())
        ) OR
        is_admin()
    );

-- INVOICES TABLE POLICIES
-- Customers can view their own invoices
-- Admins can view all invoices
CREATE POLICY "Invoice visibility" ON invoices
    FOR SELECT USING (
        customer_id = auth.uid() OR
        is_admin()
    );

-- Only admins can create/update invoices
CREATE POLICY "Invoice management" ON invoices
    FOR ALL USING (is_admin());

-- PAYMENTS TABLE POLICIES
-- Users can view payments for their orders/invoices
CREATE POLICY "Payment visibility" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders o 
            WHERE o.id = payments.order_id AND o.customer_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM invoices i 
            WHERE i.id = payments.invoice_id AND i.customer_id = auth.uid()
        ) OR
        is_admin()
    );

-- Payment creation handled by system/webhooks and admins
CREATE POLICY "Payment creation" ON payments
    FOR INSERT WITH CHECK (is_admin());

-- Only admins can update payments
CREATE POLICY "Payment updates" ON payments
    FOR UPDATE USING (is_admin());

-- NOTIFICATIONS TABLE POLICIES
-- Users can view their own notifications
CREATE POLICY "Notification visibility" ON notifications
    FOR SELECT USING (user_id = auth.uid() OR is_admin());

-- Users can update their own notifications (mark as read)
CREATE POLICY "Notification updates" ON notifications
    FOR UPDATE USING (user_id = auth.uid() OR is_admin());

-- System and admins can create notifications
CREATE POLICY "Notification creation" ON notifications
    FOR INSERT WITH CHECK (is_admin());

-- Users can delete their own notifications
CREATE POLICY "Notification deletion" ON notifications
    FOR DELETE USING (user_id = auth.uid() OR is_admin());

-- PUSH TOKENS TABLE POLICIES
-- Users can manage their own push tokens
CREATE POLICY "Push token management" ON push_tokens
    FOR ALL USING (user_id = auth.uid() OR is_admin());

-- APP SETTINGS TABLE POLICIES
-- Public settings can be viewed by all authenticated users
-- Private settings only by admins
CREATE POLICY "App settings visibility" ON app_settings
    FOR SELECT USING (
        (is_public = true AND auth.uid() IS NOT NULL) OR
        is_admin()
    );

-- Only super admins can modify app settings
CREATE POLICY "App settings management" ON app_settings
    FOR ALL USING (is_super_admin());

-- AUDIT LOGS TABLE POLICIES
-- Only admins can view audit logs
CREATE POLICY "Audit log visibility" ON audit_logs
    FOR SELECT USING (is_admin());

-- System can insert audit logs (via triggers)
-- Admins can insert manual audit entries
CREATE POLICY "Audit log creation" ON audit_logs
    FOR INSERT WITH CHECK (is_admin());

-- Only super admins can delete audit logs
CREATE POLICY "Audit log deletion" ON audit_logs
    FOR DELETE USING (is_super_admin());

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, row_id, action, old_values, changed_by, ip_address)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, to_jsonb(OLD), auth.uid(), inet_client_addr());
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, row_id, action, old_values, new_values, changed_by, ip_address)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, to_jsonb(OLD), to_jsonb(NEW), auth.uid(), inet_client_addr());
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, row_id, action, new_values, changed_by, ip_address)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, to_jsonb(NEW), auth.uid(), inet_client_addr());
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to important tables
CREATE TRIGGER audit_profiles_trigger
    AFTER INSERT OR UPDATE OR DELETE ON profiles
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_orders_trigger
    AFTER INSERT OR UPDATE OR DELETE ON orders
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_invoices_trigger
    AFTER INSERT OR UPDATE OR DELETE ON invoices
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_payments_trigger
    AFTER INSERT OR UPDATE OR DELETE ON payments
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_drivers_trigger
    AFTER INSERT OR UPDATE OR DELETE ON drivers
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
