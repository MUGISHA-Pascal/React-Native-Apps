const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add support for wasm files
config.resolver.assetExts.push("wasm");
config.resolver.sourceExts = [...config.resolver.sourceExts, "wasm"];

// Add transformer for wasm files
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
