const path = require('path');

module.exports = (env, argv) => {
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
        mode: env || 'development'
    }
};