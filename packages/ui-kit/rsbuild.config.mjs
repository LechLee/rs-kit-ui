import path from 'path'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const packageJson = require('./package.json')

export default defineConfig({
	source: {
		define: {
			'process.env.basename': process.env.NODE_ENV === 'production' ? JSON.stringify(`/${packageJson.name}`) : JSON.stringify('')
		}
	},
	output: {
		assetPrefix: `/${packageJson.name}/`,
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
