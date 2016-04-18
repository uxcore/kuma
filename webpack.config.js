var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEVMODE = process.env.NODE_ENV !== 'production';

var styleLoader = 'css?sourceMap!autoprefixer?{browsers: ["last 2 versions", "not ie < 8"]}!less?sourceMap';
var plugins = [];
if (DEVMODE) {
	plugins.push(
		new ExtractTextPlugin('kuma.css')
	);
}

module.exports = {
	entry: {
        index: './index',
        style: './demo/style'
    },
	output: {
		filename: '[name].bundle.js',
		publicPath: '/demo/'
	},
	module: {
		loaders: [
			{
				test: /\.less$/,
				loader: DEVMODE ? 'style!' + styleLoader:  ExtractTextPlugin.extract(styleLoader)
			}, {
	            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
	            loader: 'url?limit=10000&minetype=image/svg+xml'
	        }
		]
	},
	plugins: plugins,
	devtool: 'source-map'
};
