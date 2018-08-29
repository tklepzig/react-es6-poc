const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",

    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },

    resolve: {
        extensions: [".ts", ".js"],
        plugins: [new TsconfigPathsPlugin({
            configFile: "./tsconfig.json"
        })]
    },

    target: "node",

    node: { __dirname: false },

    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: './tsconfig.json'
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(["./dist"]),
        new CopyWebpackPlugin([
            {
                from: "./package.json",
                to: ".",
                transform: (content, path) => {
                    var packageJson = JSON.parse(content.toString());
                    packageJson.scripts.start = "node index.js";
                    delete packageJson.devDependencies;
                    delete packageJson.jest;
                    return new Buffer(JSON.stringify(packageJson));
                }
            },
            {
                from: "./yarn.lock",
                to: "."
            }
        ])
    ]
};
