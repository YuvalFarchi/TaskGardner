// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname, {
  // Enable experimental features for Expo Router
  resolver: {
    unstable_enablePackageExports: true,
  },
});

module.exports = config; 