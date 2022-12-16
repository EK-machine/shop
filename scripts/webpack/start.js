// Core
const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const getDevConfig = require('./config/webpack.dev');
// utils
const { choosePort } = require('./utils');
// constants
const { CONSTANTS } = require('./constants');
const compiler = webpack(getDevConfig());
// server options
const devServerOptions = {
  ...getDevConfig().devServer,
  open: true,
  host: CONSTANTS.HOST,
  historyApiFallback: true,
  client: { logging: 'none', overlay: true },
  allowedHosts: 'auto',
};

(async () => {
  try {
    const chosenPort = await choosePort(CONSTANTS.PORT);
    if (!chosenPort) {
      console.log(`It's impossible to run the app`);
      return null;
    } else {
      const server = new DevServer(devServerOptions, compiler);
      server.listen(chosenPort, CONSTANTS.HOST, () => {
        console.log(`Server listening on http://${CONSTANTS.HOST}:${chosenPort}`);
      });
    }
  } catch (err) {
    console.log(`Error!`);
    console.error(err.message || err);
  }
})();
