const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");

const config = {
  mode: "development",
  entry: ["react-hot-loader/patch", "./src/index.tsx"],
  output: {
    filename: "app.[hash].js"
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  devServer: {
    hot: true,
    contentBase: __dirname + "/dist",
    port: 8080
  },
  devtool: "inline-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
module.exports = merge(common, config);
