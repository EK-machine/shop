const loadFonts = () => ({
    module:{ 
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: 'fonts/[name].[ext]',
                        outputPath: 'fonts/',
                      },
                    },
                ],
            }
          ]
    }
});

module.exports = { loadFonts };
