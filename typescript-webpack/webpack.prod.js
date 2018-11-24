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
    optimization: {
        minimizer: [new TerserPlugin()]
    }
};

var prod = { server, client };
module.exports = merge.multiple(common, prod);
