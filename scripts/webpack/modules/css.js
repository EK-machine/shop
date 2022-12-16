const env = require("postcss-preset-env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssnano = require("cssnano");

const loadCss = ({ sourceMap = false } = { sourceMap: false }) => ({
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[path][name]__[local]--[hash:base64:5]",
    },
    sourceMap,
  },
});

const loadPostCss = (
  { sourceMap = false, minify = false } = { sourceMap: false, minify: false }
) => {
  const plugins = [
    [
      "postcss-preset-env",
      env({
        stage: 0,
      }),
    ],
  ];
  if (minify) {
    plugins.push(cssnano);
  }
  return {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins,
      },
      sourceMap,
    },
  };
};

const loadDevCss = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          loadCss({ sourceMap: true }),
          loadPostCss({ sourceMap: true, minify: false }),
        ],
      },
    ],
  },
});

const loadProdCss = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          loadCss({ sourceMap: false }),
          loadPostCss({ sourceMap: false, minify: true }),
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:7].[id].css",
      chunkFilename: "css/[name].[contenthash:7].[id].css",
    }),
  ],
});

const loadSass = () => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[path][name]__[local]--[hash:base64:5]",
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
});

module.exports = { loadDevCss, loadProdCss, loadSass };
