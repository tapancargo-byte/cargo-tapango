import { Dimensions, Platform, StatusBar } from 'react-native';

// Get device dimensions
export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Platform checks
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Device type detection
export const isTablet = () => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  return Math.min(width, height) >= 600 && (aspectRatio < 1.6);
};

export const isSmallDevice = () => {
  return screenWidth < 375 || screenHeight < 667;
};

export const isLargeDevice = () => {
  return screenWidth >= 414 || screenHeight >= 896;
};

// Safe area helpers
export const getStatusBarHeight = () => {
  if (isIOS) {
    return 44; // Default for iOS
  }
  return StatusBar.currentHeight || 24;
};

// Screen size categories
export const getScreenSize = () => {
  const { width } = Dimensions.get('window');
  
  if (width < 375) {
    return 'small';
  } else if (width >= 375 && width < 414) {
    return 'medium';
  } else if (width >= 414 && width < 768) {
    return 'large';
  } else {
    return 'xlarge';
  }
};

// Responsive helpers
export const responsiveSize = (size: number, factor: number = 0.1) => {
  const baseWidth = 375; // iPhone SE width as base
  const scale = screenWidth / baseWidth;
  return Math.round(size * scale * (1 - factor) + size * factor);
};

export const responsiveWidth = (percentage: number) => {
  return (screenWidth * percentage) / 100;
};

export const responsiveHeight = (percentage: number) => {
  return (screenHeight * percentage) / 100;
};

// Animation helpers based on device
export const getAnimationScale = () => {
  if (isSmallDevice()) {
    return 0.8;
  } else if (isLargeDevice()) {
    return 1.2;
  }
  return 1;
};

export const getAnimationDuration = (baseDuration: number) => {
  if (isSmallDevice()) {
    return baseDuration * 0.8;
  } else if (isLargeDevice()) {
    return baseDuration * 1.1;
  }
  return baseDuration;
};

// Device info object
export const deviceInfo = {
  screenWidth,
  screenHeight,
  isIOS,
  isAndroid,
  isTablet: isTablet(),
  isSmallDevice: isSmallDevice(),
  isLargeDevice: isLargeDevice(),
  screenSize: getScreenSize(),
  statusBarHeight: getStatusBarHeight(),
  animationScale: getAnimationScale(),
} as const;

export type DeviceInfo = typeof deviceInfo;
