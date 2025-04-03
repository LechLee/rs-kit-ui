const path = require('path')

module.exports = {
	entry: './index.ts',
	mode: 'production',
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		library: {
			type: 'commonjs2'
		},
		clean: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname),
			'@/components': path.resolve(__dirname, 'components')
		}
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom'
	},
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
	}
}
