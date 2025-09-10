-- Complete Admin Dashboard Fix
-- This script fixes all database schema issues and missing user profiles
-- Run this in your Supabase SQL Editor

-- First, ensure we have the user profile creation function and trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    'customer'
  );
  RETURN new;
END;
$$;

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert missing user profiles for existing authenticated users
INSERT INTO profiles (id, name, email, role)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email) as name,
  au.email,
  'customer' as role
FROM auth.users au
WHERE au.id NOT IN (SELECT id FROM profiles)
ON CONFLICT (id) DO NOTHING;

-- Add missing roles and user_roles tables for admin dashboard
-- Roles table for permission-based access control
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    permissions TEXT[] DEFAULT '{}', -- Array of permission strings
    is_system_role BOOLEAN DEFAULT false, -- System roles cannot be deleted
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User roles junction table (many-to-many: users can have multiple roles)
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES profiles(id), -- Who assigned this role
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Unique constraint: user can only have each role once
    UNIQUE(user_id, role_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);

-- Apply updated_at trigger to roles table
DROP TRIGGER IF EXISTS update_roles_updated_at ON roles;
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default system roles that match the user_role enum
INSERT INTO roles (name, description, permissions, is_system_role) VALUES
('customer', 'Customer role with basic permissions', 
 ARRAY['orders:create', 'orders:view_own', 'profile:update_own'], true),
('driver', 'Driver role with delivery permissions', 
 ARRAY['orders:accept', 'orders:update_status', 'orders:view_assigned', 'profile:update_own', 'locations:update_own'], true),
('admin', 'Administrator role with management permissions', 
 ARRAY['orders:view_all', 'orders:manage', 'drivers:manage', 'customers:view', 'invoices:manage', 'notifications:send'], true),
('super_admin', 'Super administrator with full permissions', 
 ARRAY['*'], true) -- Wildcard permission for full access
ON CONFLICT (name) DO NOTHING;

-- Create function to sync profile role with user_roles table
-- This ensures backward compatibility with existing user_role enum
CREATE OR REPLACE FUNCTION sync_profile_role_to_user_roles()
RETURNS TRIGGER AS $$
DECLARE
    role_uuid UUID;
BEGIN
    -- Get the role UUID based on the profile's role
    SELECT id INTO role_uuid FROM roles WHERE name = NEW.role;
    
    IF role_uuid IS NOT NULL THEN
        -- Remove existing role assignment for this user
        DELETE FROM user_roles WHERE user_id = NEW.id;
        
        -- Add new role assignment
        INSERT INTO user_roles (user_id, role_id, assigned_by) 
        VALUES (NEW.id, role_uuid, NEW.id)
        ON CONFLICT (user_id, role_id) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically sync profile role changes
DROP TRIGGER IF EXISTS sync_profile_role_trigger ON profiles;
CREATE TRIGGER sync_profile_role_trigger 
    AFTER INSERT OR UPDATE OF role ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION sync_profile_role_to_user_roles();

-- Sync existing profile roles to user_roles table
DO $$
DECLARE
    profile_record RECORD;
    role_uuid UUID;
BEGIN
    FOR profile_record IN SELECT id, role FROM profiles LOOP
        SELECT id INTO role_uuid FROM roles WHERE name = profile_record.role;
        
        IF role_uuid IS NOT NULL THEN
            INSERT INTO user_roles (user_id, role_id, assigned_by) 
            VALUES (profile_record.id, role_uuid, profile_record.id)
            ON CONFLICT (user_id, role_id) DO NOTHING;
        END IF;
    END LOOP;
END
$$;

-- Add RLS policies for roles table
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all roles" ON roles;
DROP POLICY IF EXISTS "Super admins can manage roles" ON roles;

-- Allow admins and super_admins to view all roles
CREATE POLICY "Admins can view all roles" ON roles
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'super_admin')
    )
);

-- Only super_admins can modify roles
CREATE POLICY "Super admins can manage roles" ON roles
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'super_admin'
    )
);

-- Add RLS policies for user_roles table
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all user roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage user roles" ON user_roles;

-- Users can view their own role assignments
CREATE POLICY "Users can view own roles" ON user_roles
FOR SELECT USING (user_id = auth.uid());

-- Admins can view all user role assignments
CREATE POLICY "Admins can view all user roles" ON user_roles
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'super_admin')
    )
);

-- Only admins can assign/modify user roles
CREATE POLICY "Admins can manage user roles" ON user_roles
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'super_admin')
    )
);

-- Create a test admin user (replace with your actual user email)
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';

-- Verification queries to check everything worked
SELECT 'Profiles created:', COUNT(*) FROM profiles;
SELECT 'Roles created:', COUNT(*) FROM roles;
SELECT 'User roles assigned:', COUNT(*) FROM user_roles;

-- Success message
SELECT 'Admin dashboard database fix completed successfully!' as status;
