const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// SDK 54: Enhanced features
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// SDK 54: CSS auto-prefixing with lightningcss is now enabled by default
// Configure browserslist in package.json if needed

// SDK 54: experimentalImportSupport is now enabled by default
// Can be disabled if needed:
// config.resolver.experimentalImportSupport = false;

// SDK 54: Live bindings enabled by default
// Disable with EXPO_UNSTABLE_LIVE_BINDINGS=false if needed

// Transformer configuration for better performance
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

// SDK 54: Support for new file extensions and optimizations
config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = config;