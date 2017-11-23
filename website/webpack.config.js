const webpack = require("webpack");
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: (loader) => [
                            autoprefixer,
                        ]
                    }
                }]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'stage-1', 'react']
                        }
                    }
                ]
            },
            { test: /\.gif$/, use: [{ loader: 'file-loader?name=[path][name].[ext]' }]},
            { test: /\.png$/, use: [{ loader: 'file-loader?name=[path][name].[ext]' }]}
        ],
    },
    devtool: 'source-map',
    plugins: [
       new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    resolve: {
        mainFields: [
            'module', // adds check for 'module'
            'webpack',
            'browser',
            'web',
            ['jam', 'main'],
            'main',
        ],
        alias: {
            MovieManager: path.resolve(__dirname, 'src/MovieManager'),
            components: path.resolve(__dirname, 'src/components/')
        },
    }
};