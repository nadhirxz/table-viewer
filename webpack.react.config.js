require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { production } = require('./webpack.values');

module.exports = {
	mode: production ? 'production' : 'development',
	...(!production && { devtool: 'source-map' }),
	entry: './src/react/index.tsx',
	target: 'electron-renderer',
	output: {
		path: path.join(__dirname, '/build/react'),
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/src/react/index.html',
			filename: 'index.html',
			inject: 'body',
		}),
		new MiniCssExtractPlugin(),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'build/react'),
		},
		compress: true,
		port: process.env.PORT || 3000,
		hot: true,
	},
	resolve: {
		alias: {
			['@']: path.resolve(__dirname, 'src'),
			'react-dom': '@hot-loader/react-dom',
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				include: /src/,
				use: [{ loader: 'ts-loader' }],
			},
			{
				test: /\.css$/,
				include: /src/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: ['file-loader'],
			},
		],
	},
	...(production && { optimization: require('./webpack.values').optimization }),
};
