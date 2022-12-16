// Core
const webpack = require('webpack');
// Config
const getProdConfig = require('./config/webpack.prod');
// Compiler
const compiler = webpack(getProdConfig());

compiler.run((error, stats)=> {
    if(error){
        // Configuration error
        console.log(error.stack || error);
        if(error.details){
            console.log(error.details)
        }
        return null;
    }
    const info = stats.toString({
        hash: true,
        colors: true,
        modules: false,
        version: true,
        env: true,
        entrypoint: false,
    });
    console.log('Build completed', info);
    if(stats.hasErrors()) { // error during compilation
        console.error("Error!", info);
    }
    if(stats.hasWarnings()) { // warnings during compilation
        console.error("Warning!", info);
    }

});

