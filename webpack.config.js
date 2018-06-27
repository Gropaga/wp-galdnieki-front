const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../public/js');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    entry: {
        thinkingInReact: APP_DIR + '/index.js',
    },
    output: {
        path: BUILD_DIR,
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
                test: /\.scss?$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    mode: 'development'
};

module.exports = config;
