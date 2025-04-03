import path from 'path'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { createRequire } from 'module'
import { rslib } from '@rslib/core'

// const require = createRequire(import.meta.url)
// const packageJson = require('./package.json')

export default defineConfig({
	source: {
		entry: './index.ts'
		// define: {
		// 	'process.env.basename': process.env.NODE_ENV === 'production' ? JSON.stringify(`/${packageJson.name}`) : JSON.stringify('')
		// }
	},
	output: {
		// assetPrefix: `/${packageJson.name}/`,
		distPath: {
			root: 'dist'
		},
		library: {
			type: 'module',
			export: 'default'
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname)
		}
	},
	plugins: [
		pluginReact(),
		rslib({
			entry: './index.ts',
			outDir: 'dist',
			declaration: true,
			declarationDir: 'dist',
			emitDeclarationOnly: false,
			declarationMap: true,
			sourceMap: true
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['postcss-loader'],
				type: 'css'
			}
		]
	}
	// html: {
	// 	meta: {
	// 		viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
	// 	}
	// }
})
