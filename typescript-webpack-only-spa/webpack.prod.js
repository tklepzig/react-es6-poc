const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common");

const config = {
  mode: "production",
  output: {
    filename: "app.[chunkhash].js"
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};

module.exports = merge(common, config);
