const path = require('path');

const config = {
	entry: {
		'sprite-gif': './src/sprite-gif.js'
	},
  output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		libraryTarget: 'umd',
	},
	module: {
		rules: [{
			test: /\.js$/,
		}]
	}
};

module.exports = config;
