const loadJavaScript = () => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            }
        ]
    }
});

const loadTypeScript = () => ({
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
                  {
                    loader: 'ts-loader',
                  },
                ],
            }
        ]
    }
});

module.exports = { loadJavaScript, loadTypeScript  };