const validate = require('webpack-validator')
const path = require('path')

module.exports = validate({
	context: __dirname + '/src',
	entry: './index.js',
	output: {
		path: __dirname + '/public',
		filename: 'index.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /(node_modules)/, loader: 'babel' },
			{ test: /\.json$/, loader: 'json' }
		]
	},
	resolve: {
		root:               [path.resolve('.'), path.resolve('./src')],
		modulesDirectories: ['.', 'src', 'lib', 'node_modules'],
		extensions:         ['', '.js', '.json']
	}
})
