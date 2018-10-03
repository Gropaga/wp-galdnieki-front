const config = require('../webpack.config');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(config('development'));
const express = require('express');
const app = express();
const path = require("path");

app.use(middleware(compiler, {
    // webpack-dev-middleware options
}));

// match the universe
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', '/index.html'));
});

app.listen(3000, () => console.log('Serving static files at 3000!'));