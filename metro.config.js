const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-typescript-transformer'
    ),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    assetExts: ['bin', 'txt', 'jpg', 'png', 'ttf'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    blacklistRE: blacklist([/platform_node/])
  }
};



