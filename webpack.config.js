const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  public: path.resolve(__dirname, 'public/'),
  components: path.resolve(__dirname, 'src/components/'),
  data: path.resolve(__dirname, 'src/data/'),
  interfaces: path.resolve(__dirname, 'src/data/'),
  reduxSlices: path.resolve(__dirname, 'src/redux/slices/'),
  helpers: path.resolve(__dirname, 'src/helpers/'),
  hooks: path.resolve(__dirname, 'src/hooks/'),
  apis: path.resolve(__dirname, 'src/api/'),
  assets: 'assets/',
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: `${PATHS.src}/index.js`,
  },
  output: {
    path: PATHS.dist,
    filename: 'main.js',
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: PATHS.dist,
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\module\.css$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    alias: {
      Images: PATHS.public,
      Components: PATHS.components,
      Data: PATHS.data,
      Interfaces: PATHS.interfaces,
      ReduxSlices: PATHS.reduxSlices,
      Helpers: PATHS.helpers,
      Hooks: PATHS.hooks,
      Apis: PATHS.apis,
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      algorithm: 'gzip',
      deleteOriginalAssets: false,
      filename: '[path][base].gz',
    }),
  ],
};
