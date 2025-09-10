import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Select, SelectOption } from '../../src/components/ui/Select';
import { router } from 'expo-router';

interface BookingForm {
  pickupAddress: string;
  deliveryAddress: string;
  cargoType: string;
  weight: string;
  dimensions: string;
  urgency: string;
  specialInstructions: string;
  contactPhone: string;
  pickupDate: string;
  deliveryDate: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * Cargo Booking Screen
 * 
 * Comprehensive form for booking cargo shipments
 */
export default function BookingScreen() {
  const [form, setForm] = useState<BookingForm>({
    pickupAddress: '',
    deliveryAddress: '',
    cargoType: '',
    weight: '',
    dimensions: '',
    urgency: '',
    specialInstructions: '',
    contactPhone: '',
    pickupDate: '',
    deliveryDate: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const cargoTypeOptions: SelectOption[] = [
    { label: 'General Cargo', value: 'general' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Documents', value: 'documents' },
    { label: 'Perishable Goods', value: 'perishable' },
    { label: 'Fragile Items', value: 'fragile' },
    { label: 'Automotive Parts', value: 'automotive' },
    { label: 'Textiles', value: 'textiles' },
    { label: 'Other', value: 'other' },
  ];

  const urgencyOptions: SelectOption[] = [
    { label: 'Standard (3-5 days)', value: 'standard' },
    { label: 'Express (1-2 days)', value: 'express' },
    { label: 'Same Day', value: 'same-day' },
    { label: 'Scheduled', value: 'scheduled' },
  ];

  const updateForm = (field: keyof BookingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.pickupAddress.trim()) {
      newErrors.pickupAddress = 'Pickup address is required';
    }
    if (!form.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }
    if (!form.cargoType) {
      newErrors.cargoType = 'Cargo type is required';
    }
    if (!form.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(Number(form.weight))) {
      newErrors.weight = 'Weight must be a number';
    }
    if (!form.urgency) {
      newErrors.urgency = 'Urgency level is required';
    }
    if (!form.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Booking Successful!',
        'Your cargo booking has been submitted. You will receive a confirmation shortly.',
        [
          {
            text: 'View Orders',
            onPress: () => router.push('/(tabs)/orders'),
          },
          {
            text: 'Book Another',
            onPress: () => {
              setForm({
                pickupAddress: '',
                deliveryAddress: '',
                cargoType: '',
                weight: '',
                dimensions: '',
                urgency: '',
                specialInstructions: '',
                contactPhone: '',
                pickupDate: '',
                deliveryDate: '',
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateEstimatedCost = (): string => {
    const weight = Number(form.weight) || 0;
    const baseRate = 5; // $5 per kg
    let multiplier = 1;

    if (form.urgency === 'express') multiplier = 1.5;
    if (form.urgency === 'same-day') multiplier = 2.5;

    return (weight * baseRate * multiplier).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Cargo Shipment</Text>
        <Text style={styles.subtitle}>
          Fill in the details below to book your cargo shipment
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup & Delivery</Text>
          
          <Input
            label="Pickup Address"
            value={form.pickupAddress}
            onChangeText={(text) => updateForm('pickupAddress', text)}
            placeholder="Enter pickup address"
            error={errors.pickupAddress}
            required
          />

          <Input
            label="Delivery Address"
            value={form.deliveryAddress}
            onChangeText={(text) => updateForm('deliveryAddress', text)}
            placeholder="Enter delivery address"
            error={errors.deliveryAddress}
            required
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cargo Details</Text>
          
          <Select
            label="Cargo Type"
            value={form.cargoType}
            onValueChange={(value) => updateForm('cargoType', value)}
            options={cargoTypeOptions}
            error={errors.cargoType}
            required
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="Weight (kg)"
                value={form.weight}
                onChangeText={(text) => updateForm('weight', text)}
                placeholder="0.0"
                keyboardType="numeric"
                error={errors.weight}
                fullWidth={false}
                required
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Dimensions (cm)"
                value={form.dimensions}
                onChangeText={(text) => updateForm('dimensions', text)}
                placeholder="L x W x H"
                fullWidth={false}
              />
            </View>
          </View>

          <Input
            label="Special Instructions"
            value={form.specialInstructions}
            onChangeText={(text) => updateForm('specialInstructions', text)}
            placeholder="Any special handling instructions..."
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Options</Text>
          
          <Select
            label="Urgency Level"
            value={form.urgency}
            onValueChange={(value) => updateForm('urgency', value)}
            options={urgencyOptions}
            error={errors.urgency}
            required
          />

          <Input
            label="Contact Phone"
            value={form.contactPhone}
            onChangeText={(text) => updateForm('contactPhone', text)}
            placeholder="+1 (555) 123-4567"
            keyboardType="phone-pad"
            error={errors.contactPhone}
            required
          />
        </View>

        {form.weight && form.urgency && (
          <View style={styles.estimateCard}>
            <Text style={styles.estimateTitle}>Estimated Cost</Text>
            <Text style={styles.estimateAmount}>${calculateEstimatedCost()}</Text>
            <Text style={styles.estimateNote}>
              *Final price may vary based on actual dimensions and route
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? "Submitting..." : "Book Shipment"}
            variant="primary"
            onPress={handleSubmit}
            fullWidth
            disabled={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  form: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  estimateCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  estimateTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  estimateAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  estimateNote: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
});
