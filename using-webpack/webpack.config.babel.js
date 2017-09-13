import webpack from "webpack";
import path from "path";
import ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import OptimizeCssAssetsWebpackPlugin from "optimize-css-assets-webpack-plugin";


module.exports = env => {

    console.dir(env);

    const config = {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "output.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/, // files ending with .js
                    exclude: /node_modules/, // exclude the node_modules directory
                    use: ["babel-loader"] // use this (babel-core) loader
                }
            ]
        },
        plugins: [
            new ExtractTextWebpackPlugin("style.css")
        ],
        devServer: {
            contentBase: path.resolve(__dirname, "public"),
            historyApiFallback: true,
            inline: true,
            open: true
        },
        devtool: "eval-source-map"
    }


    if (env.prod) {
        config.module.rules.push({
            test: /\.scss$/,
            use: ExtractTextWebpackPlugin.extract({
                use: ["css-loader", "sass-loader"],
                fallback: "style-loader"
            })
        });

        config.plugins.push(new OptimizeCssAssetsWebpackPlugin());
    }
    else {
        config.module.rules.push({
            test: /\.scss$/,
            loader: ["style-loader", "css-loader", "sass-loader"]
        });
    }

    return config;
};