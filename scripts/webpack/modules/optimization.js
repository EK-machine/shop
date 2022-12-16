const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const optimizeBuild = () => ({
  optimization: {
    nodeEnv: "production",
    minimize: true,
    minimizer: [new TerserPlugin()],
    // does not emit any bundle in case there is an error during compilation
    noEmitOnErrors: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    // removes module if the module is already in parent chunk
    removeAvailableModules: true,
    // concatenates modules to the common function / hoisting scope. works dependent on usedExports and providedExports
    concatenateModules: true,
    // defines exported entities for each module
    providedExports: true,
    usedExports: true,
    // does treeshaking. works dependent on usedExports and providedExports
    sideEffects: true,
    moduleIds: "size",
    chunkIds: "size",
    splitChunks: {
      chunks: "all", // async, initial
      minSize: 30000, // minimal chaunk weight we define for splitting
      minChunks: 1, // how many chunks shall contain the code to emit to a separate chunk
      maxAsyncRequests: 5, // maximum number of parallel requests when on-demand loading
      maxInitialRequests: 3, // maximum number of parallel requests at an entry point
      cacheGroups: {
        vendors: {
          chunks: "initial",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    // main build file with runtime containing reference to the third chunk will emit runtime to a separate file
    // and that's why file with main component will not change it's name, just the file with runtime will do
    runtimeChunk: true,
  },
});

const optimizeImages = () => ({
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
      }),
    ],
  },
});

module.exports = { optimizeImages, optimizeBuild };
