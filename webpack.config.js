const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css minification
const TerserPlugin = require('terser-webpack-plugin');
const cssnano = require("cssnano");

// "npx webpack" arguments:
// --build-dir=
// --resource-url= (json file location dir)
// --image-url= (image file location dir)
// --ga= (GOOGLE ANALYTICS CODE)
// --env= (production or development)
// --mode= (production or development)

const resource_url = {
    development: 'http://localhost:8080/app/cache/',
    production: "/"
};

const image_url = {
    development: 'http://localhost:8080/app/uploads/',
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
                "RESOURCE_URL": JSON.stringify(argv['resource-url']) || JSON.stringify(resource_url[env]),
                "IMAGE_URL": JSON.stringify(argv['image-url']) || JSON.stringify(image_url[env]),
                "GA": JSON.stringify(argv['ga']) || JSON.stringify('UA-111111111-1')
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
                    // minify js
                    new TerserPlugin({
                        test: /\.js(\?.*)?$/i
                    }),
                    // minify css
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
                // saves css to file
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