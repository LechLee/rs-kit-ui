import path from 'path'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const packageJson = require('./package.json')

// Path to the packages directory in the monorepo
const packagesDir = path.resolve(__dirname, '..')

export default defineConfig({
	source: {
		// Include the ui-kit package for compilation
		include: [
			// Compile files from the ui-kit package
			// This allows Rsbuild to compile and resolve workspace packages
			{
				and: [path.resolve(packagesDir, 'ui-kit'), { not: /[\\/]node_modules[\\/]/ }]
			}
		]
	},
	output: {
		// assetPrefix: `/${packageJson.name}/`,
		distPath: {
			root: 'dist'
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [pluginReact()],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['postcss-loader'],
				type: 'css'
			}
		]
	},
	html: {
		meta: {
			viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
		}
	}
})
