var webpack = require('webpack')

module.exports = {
    entry: {
        'shexy': './src/index.js',
        'shexy.min': './src/index.js'
    },
    output: {
        libraryTarget: 'umd',
        library: 'Shexy',
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    optimize: {
        UglifyJsPlugin: true
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            test: /\.js$/
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    stats: {
        colors: true
    },
    resolve: {
        modulesDirectories: ['.', 'src', 'node_modules'],
        extensions: ['', '.js']
    },
    devtool: 'source-map'
}
