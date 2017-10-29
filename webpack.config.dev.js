const merge = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
    devtool: "source-map",
    devServer: {
        port: 8080
    }
});
