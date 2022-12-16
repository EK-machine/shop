const {merge} = require('webpack-merge');
const getCommonConfig = require('./webpack.common');
const { modules } = require('../modules/modules');

module.exports = () => {
    return merge(
        getCommonConfig(), 
        {
            mode: 'development',
            devtool: "eval-cheap-module-source-map",
            entry: [
                `webpack-hot-middleware/client?reload=true&quiet=true`
            ],
        },
        modules.loadDevCss(),
    )}