module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-navigation|@react-native|@react-navigation|expo(nent)?|@expo|@unimodules|unimodules|sentry-expo|lottie-react-native|@tamagui|react-native-.*|expo-.*|@expo-google-fonts|expo-modules-core)/)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/tests/e2e/',
    '<rootDir>/storybook/tests/',
    '<rootDir>/playwright-tests/',
    '.*.e2e.spec.[jt]s$',
    '.*.pw.spec.[jt]s$',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
  ],
};
