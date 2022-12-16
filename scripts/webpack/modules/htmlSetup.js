const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

const htmlSetup = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'Traning project',
      // favicon: 'public/favicon.ico',
      inject: 'body',
    }),
    // new ESLintPlugin(),
  ],
});

module.exports = { htmlSetup };
