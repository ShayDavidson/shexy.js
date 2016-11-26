var webpack = require('webpack') // eslint-disable-line no-var

module.exports = {
	entry: {
		'shexy': './lib/index.js',
		'shexy.min': './lib/index.js'
	},
	output: {
		libraryTarget: 'var',
		library: 'Shexy',
		path: __dirname + '/bundle',
		filename: '[name].js'
	},
	optimize: {
		UglifyJsPlugin: true
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /(node_modules)/,
			loader: 'babel'
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
	}
}
