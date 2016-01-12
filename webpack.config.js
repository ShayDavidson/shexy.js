var webpack = require('webpack')

module.exports = {
    entry: {
        'shexy': './src/index.es6',
        'shexy.min': './src/index.es6'
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
            test: /\.es6$/
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
        extensions: ['', '.es6']
    },
    devtool: 'source-map'
}
