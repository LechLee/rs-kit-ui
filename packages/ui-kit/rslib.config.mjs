import path from 'path'
import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
	source: {
		entry: {
			index: ['./index.ts']
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname)
		}
	},
	lib: [
		{
			bundle: false,
			dts: true,
			format: 'esm'
		}
	],
	output: {
		target: 'web'
	},
	plugins: [pluginReact()]
})
