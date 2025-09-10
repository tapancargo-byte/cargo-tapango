import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../src/components/ui/Button';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '../components/SignOutButton';

/**
 * Profile Screen
 * 
 * Shows user profile and settings
 */
export default function ProfileScreen() {
  const { user } = useUser();

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
    // TODO: Navigate to edit profile
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>
          {user?.firstName && user?.lastName 
            ? `${user.firstName} ${user.lastName}`
            : user?.emailAddresses?.[0]?.emailAddress || 'User'}
        </Text>
        <Text style={styles.userRole}>Customer</Text>
      </View>

      <View style={styles.actionsSection}>
        <Button
          title="Edit Profile"
          variant="secondary"
          onPress={handleEditProfile}
          fullWidth
          style={styles.actionButton}
        />
        
        <Button
          title="Settings"
          variant="secondary"
          onPress={() => console.log('Settings pressed')}
          fullWidth
          style={styles.actionButton}
        />
        
        <Button
          title="Help & Support"
          variant="secondary"
          onPress={() => console.log('Help pressed')}
          fullWidth
          style={styles.actionButton}
        />
        
        <Button
          title="Developer"
          variant="secondary"
          onPress={() => router.push('/developer' as any)}
          fullWidth
          style={styles.actionButton}
        />
        
        <SignOutButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#6c757d',
  },
  actionsSection: {
    flex: 1,
    padding: 24,
  },
  actionButton: {
    marginBottom: 12,
  },
  signOutButton: {
    marginTop: 'auto',
    marginBottom: 0,
  },
});
