const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const { modules } = require('../modules/modules');
const { CONSTANTS } = require('../constants');

module.exports = () => {
  const { NODE_ENV } = process.env;
  const isDev = NODE_ENV === 'development';

  return merge(
    {
      entry: [CONSTANTS.src],
      output: {
        path: CONSTANTS.dist,
        filename: isDev ? 'js/bundle.[name].[hash].[id].js' : 'js/bundle.[name].[chunkhash].[id].js', // entry point bundle name
        chunkFilename: 'js/bundle.[name].[chunkhash].[id].js',
        clean: true,
        hashDigestLength: 7, // defines how many characters will be in hash
      },
      plugins: [
        // DefinePlugin is used for creating enviroments to be visible anywhere the code
        new DefinePlugin({
          __ENV__: JSON.stringify(NODE_ENV),
          __DEV__: NODE_ENV === 'development',
          __PROD__: NODE_ENV === 'production',
          __STAGE__: NODE_ENV === 'stage',
        }),
      ],
    },
    modules.loadJavaScript(),
    modules.loadTypeScript(),
    modules.loadSvg(),
    modules.loadImages(),
    modules.loadSass(),
    modules.loadFonts(),
    modules.setupUtils(),
    modules.htmlSetup(),
    modules.resolvers(),
  );
};
