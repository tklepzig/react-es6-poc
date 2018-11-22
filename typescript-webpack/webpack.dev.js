const merge = require("webpack-merge");
const common = require("./webpack.common");

const server = {
    mode: "development",
    devtool: "inline-source-map"
};

const client = {
    mode: "development",
    devtool: "inline-source-map"
};
var dev = { server, client };

module.exports = merge.multiple(common, dev)

