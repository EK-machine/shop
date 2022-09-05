const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        app: "./src/index.js",
      },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js',
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        static: true,
    },
    module: {
        rules: [
            {
                use: [
                  'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        }
                    }
                ],
                include: /\module\.css$/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                use: [
                  {
                    loader: "ts-loader",
                  },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: "svg-url-loader",
                  },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      outputPath: "fonts/",
                    },
                  },
                ],
              },
        ]
    },
    plugins: [ new MiniCssExtractPlugin()],
}