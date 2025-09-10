-- Migration to fix compatibility issues with admin dashboard
-- This addresses mismatches between schema and TypeScript types

-- 1. Add full_name column to profiles (admin expects this instead of name)
ALTER TABLE profiles ADD COLUMN full_name TEXT;
UPDATE profiles SET full_name = name WHERE full_name IS NULL;
ALTER TABLE profiles ALTER COLUMN full_name SET NOT NULL;

-- 2. Fix driver status enum to match admin expectations
ALTER TYPE driver_status RENAME TO driver_status_old;
CREATE TYPE driver_status AS ENUM ('pending', 'approved', 'suspended', 'rejected');
ALTER TABLE drivers ALTER COLUMN status TYPE driver_status USING 
  CASE 
    WHEN status::text = 'offline' THEN 'pending'::driver_status
    WHEN status::text = 'online' THEN 'approved'::driver_status  
    WHEN status::text = 'busy' THEN 'approved'::driver_status
    WHEN status::text = 'break' THEN 'suspended'::driver_status
    ELSE 'pending'::driver_status
  END;
DROP TYPE driver_status_old;

-- 3. Add is_online column to drivers (separate from status)
ALTER TABLE drivers ADD COLUMN is_online BOOLEAN DEFAULT false;
UPDATE drivers SET is_online = (status = 'approved');

-- 4. Fix invoice status enum
ALTER TYPE invoice_status RENAME TO invoice_status_old;
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
ALTER TABLE invoices ALTER COLUMN status TYPE invoice_status USING
  CASE
    WHEN status::text = 'issued' THEN 'sent'::invoice_status
    WHEN status::text = 'void' THEN 'cancelled'::invoice_status
    ELSE status::text::invoice_status
  END;
DROP TYPE invoice_status_old;

-- 5. Add profile_id to drivers table (admin expects this)
ALTER TABLE drivers ADD COLUMN profile_id UUID REFERENCES profiles(id);
UPDATE drivers SET profile_id = id;
ALTER TABLE drivers ALTER COLUMN profile_id SET NOT NULL;

-- 6. Create RBAC tables that admin expects
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    permissions TEXT[] DEFAULT '{}',
    is_system_role BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES profiles(id),
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role_id)
);

-- 7. Insert default system roles
INSERT INTO roles (name, description, permissions, is_system_role) VALUES
('super_admin', 'Super Administrator with full access', 
 '["users.read", "users.write", "users.delete", "orders.read", "orders.write", "orders.delete", "drivers.read", "drivers.write", "drivers.delete", "invoices.read", "invoices.write", "invoices.delete", "roles.read", "roles.write", "roles.delete", "settings.read", "settings.write"]', 
 true),
('admin', 'Administrator with most access', 
 '["users.read", "users.write", "orders.read", "orders.write", "drivers.read", "drivers.write", "invoices.read", "invoices.write", "roles.read"]', 
 true),
('driver', 'Driver with limited access', 
 '["orders.read", "orders.write_own", "profile.read", "profile.write_own"]', 
 true),
('customer', 'Customer with basic access', 
 '["orders.read_own", "orders.write_own", "profile.read", "profile.write_own"]', 
 true);

-- 8. Create user roles based on existing profile roles
INSERT INTO user_roles (user_id, role_id)
SELECT p.id, r.id 
FROM profiles p
JOIN roles r ON r.name = p.role::text
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles ur WHERE ur.user_id = p.id AND ur.role_id = r.id
);

-- 9. Add missing columns to drivers that admin expects
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS license_number TEXT;
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS vehicle_type TEXT;
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS vehicle_model TEXT;
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS vehicle_plate TEXT;
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.0;
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS total_trips INTEGER DEFAULT 0;
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS current_latitude DECIMAL(10,8);
ALTER TABLE drivers ADD COLUMN IF NOT EXISTS current_longitude DECIMAL(11,8);

-- Update existing drivers with vehicle info from JSONB
UPDATE drivers 
SET 
  license_number = COALESCE(license_number, 'LICENSE-' || SUBSTR(id::text, 1, 8)),
  vehicle_type = COALESCE(vehicle_type, vehicle_info->>'type', 'sedan'),
  vehicle_model = COALESCE(vehicle_model, vehicle_info->>'make' || ' ' || vehicle_info->>'model', 'Unknown'),
  vehicle_plate = COALESCE(vehicle_plate, vehicle_info->>'plate', 'PLATE-' || SUBSTR(id::text, 1, 6))
WHERE license_number IS NULL OR vehicle_type IS NULL OR vehicle_model IS NULL OR vehicle_plate IS NULL;

-- 10. Create indexes for RBAC tables
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);

-- 11. Create updated_at trigger for new tables
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 12. Enable RLS on new tables
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- 13. Create RLS policies for RBAC tables
CREATE POLICY "Admins can manage roles" ON roles FOR ALL USING (is_admin());
CREATE POLICY "Users can view roles" ON roles FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage user roles" ON user_roles FOR ALL USING (is_admin());
CREATE POLICY "Users can view own roles" ON user_roles FOR SELECT USING (user_id = auth.uid() OR is_admin());