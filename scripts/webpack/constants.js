const path = require('path');
const { path: PROJECT_ROOT } = require('app-root-path');

// exports.PROJECT_ROOT = PROJECT_ROOT;
// exports.BUILD_DIRECTORY = path.resolve(PROJECT_ROOT, './dist');
// exports.SOURCE_DIRECTORY = path.resolve(PROJECT_ROOT, './src');
// exports.HOST = 'localhost';
// exports.PORT = 3000;

const CONSTANTS = {
  root: PROJECT_ROOT,
  dist: path.resolve(PROJECT_ROOT, './dist'),
  src: path.resolve(PROJECT_ROOT, './src'),
  public: path.resolve(PROJECT_ROOT, './public'),
  components: path.resolve(PROJECT_ROOT, './src/components'),
  data: path.resolve(PROJECT_ROOT, './src/data'),
  interfaces: path.resolve(PROJECT_ROOT, './src/interfaces'),
  reduxSlices: path.resolve(PROJECT_ROOT, './src/redux/slices'),
  helpers: path.resolve(PROJECT_ROOT, './src/helpers'),
  hooks: path.resolve(PROJECT_ROOT, './src/hooks'),
  apis: path.resolve(PROJECT_ROOT, './src/api'),
  HOST: 'localhost',
  PORT: 3000,
};

module.exports = { CONSTANTS };
