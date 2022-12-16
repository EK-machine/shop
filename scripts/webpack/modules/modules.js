const { loadJavaScript, loadTypeScript } = require('./javascript');
const { loadImages } = require('./images');
const { loadSvg } = require('./svgs');
const { loadDevCss, loadProdCss, loadSass } = require('./css');
const { resolvers } = require('./resolvers');
const { htmlSetup } = require('./htmlSetup');
const { setupUtils } = require('./utils');
const { loadFonts } = require('./fonts');
const { optimizeImages, optimizeBuild } = require('./optimization');

const modules = {
  loadJavaScript,
  loadTypeScript,
  loadImages,
  loadSvg,
  loadDevCss,
  loadProdCss,
  loadSass,
  loadFonts,
  resolvers,
  htmlSetup,
  optimizeImages,
  optimizeBuild,
  setupUtils,
};

module.exports = { modules };
