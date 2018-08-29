const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

const server = {
    mode: "production",
    plugins: [new UglifyJSPlugin()]
};

const client = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            url: false //don't handle url() imports to avoid treating font-urls as modules
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": { "NODE_ENV": JSON.stringify("production") }
        }),
        new UglifyJSPlugin()
    ]
};

var prod = { server, client };
module.exports = merge.multiple(common, prod);
