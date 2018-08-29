const merge = require("webpack-merge");
const common = require("./webpack.common");

const dev = {
    mode: "development",
    devtool: "inline-source-map"
};

module.exports = merge(common, dev);

