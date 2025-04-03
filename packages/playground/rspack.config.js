const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProvidePlugin } = require('@rspack/core')
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
	entry: './src/index.tsx',
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'eval-source-map' : 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: isDev ? '[name].js' : '[name].[contenthash].js',
		clean: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname)
		},
		symlinks: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true
		}),
		new ProvidePlugin({
			React: 'react'
		}),
		isDev && new ReactRefreshPlugin()
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'builtin:swc-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['postcss-loader'],
				type: 'css'
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		port: 3000,
		hot: true,
		open: true,
		watchFiles: ['../ui-kit/dist/**/*']
	}
}
