#!/usr/bin/env node

// Script to create test users in Supabase
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ehlzbibwyqxowhwxpuoh.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVobHpiaWJ3eXF4b3dod3hwdW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMjI2NTYsImV4cCI6MjA1MDg5ODY1Nn0.l8zQZdFllEVuGXGmKRIHTGCQFdH5QdXVEqOFDlvRRLc'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTestUsers() {
  console.log('Creating test users...')

  // Create customer test user
  const { data: customerData, error: customerError } = await supabase.auth.signUp({
    email: 'customer@test.com',
    password: 'customer123',
  })

  if (customerError) {
    console.error('Error creating customer:', customerError.message)
  } else if (customerData.user) {
    console.log('Customer user created:', customerData.user.id)
    
    // Create customer profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: customerData.user.id,
        email: 'customer@test.com',
        name: 'Test Customer',
        phone: '+1234567890',
        role: 'customer',
        is_active: true
      })

    if (profileError) {
      console.error('Error creating customer profile:', profileError.message)
    } else {
      console.log('Customer profile created successfully')
    }
  }

  // Create driver test user  
  const { data: driverData, error: driverError } = await supabase.auth.signUp({
    email: 'driver@test.com',
    password: 'driver123',
  })

  if (driverError) {
    console.error('Error creating driver:', driverError.message)
  } else if (driverData.user) {
    console.log('Driver user created:', driverData.user.id)
    
    // Create driver profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: driverData.user.id,
        email: 'driver@test.com',
        name: 'Test Driver',
        phone: '+1234567891',
        role: 'driver',
        is_active: true
      })

    if (profileError) {
      console.error('Error creating driver profile:', profileError.message)
    } else {
      console.log('Driver profile created successfully')
    }

    // Create driver record
    const { error: driverRecordError } = await supabase
      .from('drivers')
      .insert({
        id: driverData.user.id,
        license_number: 'TEST123456',
        vehicle_info: {
          make: 'Toyota',
          model: 'Hiace',
          year: 2020,
          plate: 'TEST-001'
        },
        is_verified: true,
        status: 'offline',
        rating: 5.0
      })

    if (driverRecordError) {
      console.error('Error creating driver record:', driverRecordError.message)
    } else {
      console.log('Driver record created successfully')
    }
  }

  console.log('\nTest users created successfully!')
  console.log('Customer: customer@test.com / customer123')
  console.log('Driver: driver@test.com / driver123')
}

createTestUsers().catch(console.error)
