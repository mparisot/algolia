var webpack = require("webpack");
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './main.js',
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
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        mainFields: [
            'module', // adds check for 'module'
            'webpack',
            'browser',
            'web',
            ['jam', 'main'],
            'main',
        ]
    }
};