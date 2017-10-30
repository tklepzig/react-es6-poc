const path = require('path');

const nodeExternals = require('webpack-node-externals');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "app.[contenthash].css"
});

module.exports = [{
    entry: "./src/public/app.tsx",
    output: {
        filename: "app.[chunkhash].js",
        path: __dirname + "/dist/public"
    },

    devtool: "inline-source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                })
            }
        ]
    },

    plugins: [
        // new CopyWebpackPlugin([
        //     { from: "./src/public/index.html" }
        // ]),
        new CleanWebpackPlugin(["./dist"]),
        extractSass,
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
            inject: "body"
        })
    ]

    // // When importing a module whose path matches one of the following, just
    // // assume a corresponding global variable exists and use that instead.
    // // This is important because it allows us to avoid bundling all of our
    // // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
},
{
    entry: "./src/server/index.ts",
    output: {
        filename: 'index.js',
        path: __dirname + "/dist/server"
    },
    target: 'node',
    node: { __dirname: false },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            }
        ]
    }
}];