-- Fix: Create missing profile and add automatic profile creation
-- Run this in Supabase SQL Editor

-- 1. Create profile for the authenticated user
INSERT INTO profiles (id, email, name, phone, role, is_active)
VALUES (
  '4469f08c-eaae-4010-bcd8-5494bf0dd06b',
  'customer@test.com', 
  'Test Customer',
  '+1234567890',
  'customer',
  true
) ON CONFLICT (id) DO NOTHING;

-- 2. Create automatic profile creation trigger
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::user_role,
    true
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. Create additional test users with profiles
INSERT INTO auth.users (
  id, 
  email, 
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES 
(
  gen_random_uuid(),
  'driver@test.com',
  crypt('driver123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Test Driver","role":"driver"}'
) ON CONFLICT (email) DO NOTHING;

-- Verify profiles exist
SELECT id, email, name, role FROM profiles;
