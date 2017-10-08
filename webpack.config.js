var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 5000
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './dev/js/index.js',
    module: {
        rules : [
            {
                test : /\.css$/,
                use : [ 'style-loader', 'css-loader']
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    output: {
        path: 'src',
        filename: 'js/bundle.min.js'
    },
    node: {
        fs: "empty"
    },
    externals: [
        {
            './cptable': 'var cptable'
        }
    ],
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
