const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resource = {
    development: 'http://localhost:8080/app/cache/',
    production: "/"
};

// const cssSettings = {
//     development: '',
//     development: '',
// }

module.exports = (env = 'development', argv = {}) => {
    return {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        entry: {
            frontendapp: path.resolve(__dirname, 'src') + '/index.js',
        },
        output: {
            path: argv['build-dir'] || path.resolve(__dirname, 'public/js'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // env === "development" ? 'style-loader' : MiniCssExtractPlugin.loader,
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                "RESOURCE_URL": JSON.stringify(argv['resource-url']) || JSON.stringify(resource[env])
            }),
            new BundleAnalyzerPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'style.css'
                // filename: env === "development" ? '[name].css' : '[name].[hash].css',
                // chunkFilename: env === "development" ? '[id].css' : '[id].[hash].css',
            })
        ],
        mode: env
    }
};