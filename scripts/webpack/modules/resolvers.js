const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CONSTANTS } = require('../constants');

const resolvers = () => ({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    alias: {
      Images: CONSTANTS.public,
      Components: CONSTANTS.components,
      Data: CONSTANTS.data,
      Interfaces: CONSTANTS.interfaces,
      ReduxSlices: CONSTANTS.reduxSlices,
      Helpers: CONSTANTS.helpers,
      Hooks: CONSTANTS.hooks,
      Apis: CONSTANTS.apis,
    },
  },
});

module.exports = { resolvers };
