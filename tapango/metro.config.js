const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// SDK 54: Enhanced features
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Transformer configuration for better performance (no custom SVG transformer needed)
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

// Support extra source extensions used by some RN libs
if (!config.resolver.sourceExts.includes('mjs'))
  config.resolver.sourceExts.push('mjs');
if (!config.resolver.sourceExts.includes('cjs'))
  config.resolver.sourceExts.push('cjs');

module.exports = config;
