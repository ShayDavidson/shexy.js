var webpack = require("webpack");

module.exports = {
    entry: "./src/index.es6",
    output: {
        libraryTarget: "var",
        library: "Shexy",
        path: __dirname + "/dist",
        filename: "shexy.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.es6$/
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    },
    resolve: {
		modulesDirectories: [".", "src", "node_modules"],
		extensions: ["", ".es6"]
	},
    devtool: "source-map"
};
