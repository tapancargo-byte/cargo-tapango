import { StorageService } from '../storage';

// Mock AsyncStorage
const mockAsyncStorage = {
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('StorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('onboarding methods', () => {
    it('should set onboarding completed', async () => {
      await StorageService.setOnboardingCompleted(true);
      
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'onboarding_completed',
        JSON.stringify(true)
      );
    });

    it('should get onboarding completed status', async () => {
      (mockAsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(true));
      
      const result = await StorageService.getOnboardingCompleted();
      
      expect(result).toBe(true);
      expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('onboarding_completed');
    });

    it('should return false for onboarding completed when no value exists', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(null);
      
      const result = await StorageService.getOnboardingCompleted();
      
      expect(result).toBe(false);
    });
  });

  describe('first launch methods', () => {
    it('should set first launch status', async () => {
      await StorageService.setFirstLaunch(false);
      
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'first_launch',
        JSON.stringify(false)
      );
    });

    it('should return true for first launch by default', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(null);
      
      const result = await StorageService.isFirstLaunch();
      
      expect(result).toBe(true);
    });
  });

  describe('user preferences', () => {
    it('should get default user preferences', async () => {
      mockAsyncStorage.getItem.mockResolvedValueOnce(null);
      
      const preferences = await StorageService.getUserPreferences();
      
      expect(preferences).toEqual({
        reduceMotion: false,
        notifications: true,
        theme: 'system',
        language: 'en',
      });
    });

    it('should set user preferences', async () => {
      const mockCurrentPreferences = {
        reduceMotion: false,
        notifications: true,
        theme: 'system' as const,
        language: 'en',
      };
      
      (mockAsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockCurrentPreferences)
      );
      
      const newPreferences = { reduceMotion: true };
      await StorageService.setUserPreferences(newPreferences);
      
      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        'user_preferences',
        JSON.stringify({
          ...mockCurrentPreferences,
          ...newPreferences,
        })
      );
    });
  });

  describe('error handling', () => {
    it('should handle storage errors gracefully', async () => {
      mockAsyncStorage.getItem.mockRejectedValueOnce(new Error('Storage error'));
      
      const result = await StorageService.getOnboardingCompleted();
      
      expect(result).toBe(false);
    });

    it('should throw error when setting item fails', async () => {
      mockAsyncStorage.setItem.mockRejectedValueOnce(new Error('Storage error'));
      
      await expect(
        StorageService.setOnboardingCompleted(true)
      ).rejects.toThrow('Failed to save onboarding_completed');
    });
  });
});
