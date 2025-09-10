-- Create Admin User Script
-- Run this in your Supabase SQL Editor to create/update an admin user

-- Check existing users and their roles
SELECT 
    au.email,
    p.name,
    p.role,
    p.created_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
ORDER BY au.created_at DESC;

-- Option 1: Update an existing user to admin role
-- Replace 'your-email@example.com' with your actual email
-- UPDATE profiles 
-- SET role = 'admin' 
-- WHERE email = 'your-email@example.com';

-- Option 2: If you don't have any users yet, create a test admin user
-- Note: You'll need to sign up through the normal process first, then run the UPDATE above

-- Verify admin user was created/updated
SELECT 
    au.email,
    p.name,
    p.role,
    'Admin privileges: ' || CASE WHEN p.role IN ('admin', 'super_admin') THEN 'YES' ELSE 'NO' END as admin_status
FROM auth.users au
JOIN profiles p ON au.id = p.id
WHERE p.role IN ('admin', 'super_admin');
