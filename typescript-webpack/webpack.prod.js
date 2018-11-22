const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require('terser-webpack-plugin');
const common = require("./webpack.common");

const server = {
    mode: "production",
    optimization: {
        minimizer: [new TerserPlugin()]
    }
};

const client = {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": { "NODE_ENV": JSON.stringify("production") }
        })
    ],
    optimization: {
        minimizer: [new TerserPlugin()]
    }
};

var prod = { server, client };
module.exports = merge.multiple(common, prod);
