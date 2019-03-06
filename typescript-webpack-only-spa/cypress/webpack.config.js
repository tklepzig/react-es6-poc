module.exports = {
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "./cypress/tsconfig.json"
        }
      }
    ]
  }
};
