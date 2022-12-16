const { ProvidePlugin } = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackBar = require("webpackbar");

const setupUtils = () => ({
  plugins: [
    new WebpackBar(),
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      openAnalyzer: false,
      generateStatsFile: true,
    }),
    // allows do define global variables, so you do not need to define the variables everywhere in your code
    new ProvidePlugin({
      React: "react",
    }),
  ],
});

module.exports = { setupUtils };
