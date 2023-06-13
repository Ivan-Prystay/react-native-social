// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      "jsx",
      "js",
      "ts",
      "tsx",
    ],
  },
  transformer: {
    assetPlugins: [
      ...defaultConfig.transformer.assetPlugins,
      "expo-asset/tools/hashAssetFiles",
    ],
  },
};
