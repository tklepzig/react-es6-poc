const nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');


module.exports = [{
    entry: "./src/public/app.tsx",
    output: {
        filename: "app.js",
        path: __dirname + "/dist/public"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([{ from: "./src/public/index.html" }])
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
            { test: /\.ts$/, loader: "awesome-typescript-loader" }
        ]
    }
}];