const path = require('path');
const webpack = require('webpack');

module.exports = (env = 'development', argv = {}) => {
    return {
        entry: {
            thinkingInReact: path.resolve(__dirname, 'src') + '/index.js',
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
        plugins: [
            new webpack.DefinePlugin({
                "RESOURCE_URL": argv['resource-url'] || JSON.stringify("http://localhost:8080/wp-json/shop/v1/")
            }),
        ],
        mode: env
    }
};