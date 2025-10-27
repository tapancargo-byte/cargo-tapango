import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboarding_completed',
  FIRST_LAUNCH: 'first_launch',
  USER_PREFERENCES: 'user_preferences',
  THEME_PREFERENCE: 'theme_preference',
  LANGUAGE_PREFERENCE: 'language_preference',
  LAST_APP_VERSION: 'last_app_version',
  SMS_PHONE_E164: 'sms_phone_e164',
  SMS_CONSENT_AT: 'sms_consent_at',
  SELECTED_ROLE: 'selected_role',
} as const;

export interface UserPreferences {
  reduceMotion: boolean;
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export type SelectedRole = 'customer' | 'driver';

export const StorageService = {
  // Generic methods
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw new Error(`Failed to save ${key}`);
    }
  },

  async getItem<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue === null) {
        return defaultValue || null;
      }
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return defaultValue || null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw new Error(`Failed to remove ${key}`);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  },

  // Onboarding specific methods
  async setOnboardingCompleted(completed: boolean): Promise<void> {
    await this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
  },

  async getOnboardingCompleted(): Promise<boolean> {
    try {
      const result = await AsyncStorage.getItem(
        STORAGE_KEYS.ONBOARDING_COMPLETED
      );
      console.log('Onboarding completed raw value:', result);

      if (result === null) {
        console.log('No onboarding data found - onboarding not completed');
        return false;
      }

      const parsed = JSON.parse(result) as boolean;
      console.log('Onboarding completed parsed value:', parsed);
      return parsed;
    } catch (error) {
      console.error('Error checking onboarding completion:', error);
      return false; // Default to not completed on error
    }
  },

  async setFirstLaunch(isFirst: boolean): Promise<void> {
    await this.setItem(STORAGE_KEYS.FIRST_LAUNCH, isFirst);
  },

  async isFirstLaunch(): Promise<boolean> {
    try {
      const result = await AsyncStorage.getItem(STORAGE_KEYS.FIRST_LAUNCH);
      console.log('First launch raw value:', result);

      if (result === null) {
        // First time opening the app
        console.log('No first launch data found - this is first launch');
        return true;
      }

      const parsed = JSON.parse(result) as boolean;
      console.log('First launch parsed value:', parsed);
      return parsed;
    } catch (error) {
      console.error('Error checking first launch:', error);
      return true; // Default to first launch on error
    }
  },

  // User preferences
  async setUserPreferences(
    preferences: Partial<UserPreferences>
  ): Promise<void> {
    const currentPreferences = await this.getUserPreferences();
    const updatedPreferences = { ...currentPreferences, ...preferences };
    await this.setItem(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
  },

  async getUserPreferences(): Promise<UserPreferences> {
    const defaultPreferences: UserPreferences = {
      reduceMotion: false,
      notifications: true,
      theme: 'system',
      language: 'en',
    };

    const preferences = await this.getItem<UserPreferences>(
      STORAGE_KEYS.USER_PREFERENCES,
      defaultPreferences
    );

    return preferences ?? defaultPreferences;
  },

  // Theme preference
  async setThemePreference(theme: 'light' | 'dark' | 'system'): Promise<void> {
    await this.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
  },

  async getThemePreference(): Promise<'light' | 'dark' | 'system'> {
    const theme = await this.getItem<'light' | 'dark' | 'system'>(
      STORAGE_KEYS.THEME_PREFERENCE,
      'system'
    );
    return theme ?? 'system';
  },

  // Language preference
  async setLanguagePreference(language: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.LANGUAGE_PREFERENCE, language);
  },

  async getLanguagePreference(): Promise<string> {
    const language = await this.getItem<string>(
      STORAGE_KEYS.LANGUAGE_PREFERENCE,
      'en'
    );
    return language ?? 'en';
  },

  // App version tracking
  async setLastAppVersion(version: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.LAST_APP_VERSION, version);
  },

  async getLastAppVersion(): Promise<string | null> {
    return await this.getItem<string>(STORAGE_KEYS.LAST_APP_VERSION);
  },

  // Migration helpers
  async migrateData(fromVersion: string, toVersion: string): Promise<void> {
    // Add migration logic here when needed
    console.log(`Migrating data from ${fromVersion} to ${toVersion}`);
    await this.setLastAppVersion(toVersion);
  },

  // SMS helpers
  async setSmsPhoneE164(phone: string) {
    await this.setItem(STORAGE_KEYS.SMS_PHONE_E164, phone);
  },
  async getSmsPhoneE164(): Promise<string | null> {
    return await this.getItem<string>(STORAGE_KEYS.SMS_PHONE_E164, null as any);
  },
  async setSmsConsentAt(timestampIso: string) {
    await this.setItem(STORAGE_KEYS.SMS_CONSENT_AT, timestampIso);
  },
  async getSmsConsentAt(): Promise<string | null> {
    return await this.getItem<string>(STORAGE_KEYS.SMS_CONSENT_AT, null as any);
  },

  // Role selection helpers
  async setSelectedRole(role: SelectedRole): Promise<void> {
    try {
      await this.setItem(STORAGE_KEYS.SELECTED_ROLE, role);
    } catch (e) {
      console.warn('Failed to persist selected role (non-blocking):', e);
    }
  },
  async getSelectedRole(): Promise<SelectedRole | null> {
    try {
      const role = await this.getItem<SelectedRole>(
        STORAGE_KEYS.SELECTED_ROLE,
        null as any
      );
      return (role as SelectedRole | null) ?? null;
    } catch (e) {
      console.warn('Failed to read selected role (non-blocking):', e);
      return null;
    }
  },

  // Development helpers
  async clearOnboardingState(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ONBOARDING_COMPLETED,
        STORAGE_KEYS.FIRST_LAUNCH,
      ]);
      console.log(
        'Onboarding state cleared - app will show onboarding on next launch'
      );
    } catch (error) {
      console.error('Error clearing onboarding state:', error);
    }
  },

  // Debugging helpers
  async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [] as const;
    }
  },

  async getAllData(): Promise<Record<string, any>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      const data: Record<string, any> = {};

      stores.forEach(([key, value]) => {
        try {
          data[key] = value ? JSON.parse(value) : null;
        } catch {
          data[key] = value;
        }
      });

      return data;
    } catch (error) {
      console.error('Error getting all data:', error);
      return {};
    }
  },

  // Development helper to reset onboarding for testing
  async resetOnboardingForTesting(): Promise<void> {
    try {
      await this.clearOnboardingState();
      console.log('✅ Onboarding state reset for testing');
    } catch (error) {
      console.error('❌ Error resetting onboarding state:', error);
    }
  },
};

// Hook-like utility for React components
export const useStorage = () => {
  return StorageService;
};

export type StorageKeys = typeof STORAGE_KEYS;
