const path = require('path');

const config = {
	entry: {
		'sprite-gif': './src/sprite-gif.js'
	},
  output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'SpriteGif',
		libraryTarget: 'umd',
	},
	module: {
		rules: [{
			test: /\.js$/,
		}]
	}
};

module.exports = config;
