const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common");

const prod = {
    mode: "production",
    plugins: [new UglifyJSPlugin()]
};

module.exports = merge(common, prod);
