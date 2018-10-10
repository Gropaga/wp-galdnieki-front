const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css minification
const TerserPlugin = require('terser-webpack-plugin');
const cssnano = require("cssnano");

const resource = {
    development: 'http://localhost:8080/app/cache/',
    production: "/"
};

module.exports = (env = 'development', argv = {}) => {
    const settings = {
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
                        env === "development" ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                filename: 'style.css'
            })
        ],
        mode: env
    };

    if (env === 'production') {
        return Object.assign(settings, {
            optimization: {
                minimizer: [
                    new TerserPlugin({
                        test: /\.js(\?.*)?$/i
                    }),
                    new OptimizeCSSAssetsPlugin({
                        cssProcessor: cssnano,
                        cssProcessorOptions: {
                            discardComments: {
                                removeAll: true,
                            },
                            safe: true,
                        },
                        canPrint: false,
                    }),
                ],
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
            externals: {
                react: "React",
                ["react-dom"]: "ReactDOM",

            },
        });
    } else {
        return settings;
    }
};