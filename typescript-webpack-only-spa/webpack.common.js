const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const config = {
  entry: "./src/index.tsx",

  output: {
    path: __dirname + "/dist",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [
      new CleanWebpackPlugin(["./dist"]),
      new TsconfigPathsPlugin({
        configFile: "./src/tsconfig.json"
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "./src/tsconfig.json"
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/assets",
        to: "assets"
      },
      { from: "./src/manifest.json" },
      { from: "./src/favicon.ico" }
    ])
  ]

  // // When importing a module whose path matches one of the following, just
  // // assume a corresponding global variable exists and use that instead.
  // // This is important because it allows us to avoid bundling all of our
  // // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // }
};

module.exports = config;
