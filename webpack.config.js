var webpack = require('webpack')

module.exports = {
    entry: {
        'shexy': './src/index.js',
        'shexy.min': './src/index.js'
    },
    output: {
        libraryTarget: 'var',
        library: 'Shexy',
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    optimize: {
        UglifyJsPlugin: true
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
                plugins: ['transform-object-assign', 'add-module-exports']
            }
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false
            }
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
