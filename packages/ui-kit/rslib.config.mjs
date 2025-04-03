import path from 'path'
import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
	source: {
		entry: {
			index: ['./index.ts']
		},
		alias: {
			'@': '.'
		}
	},
	lib: [
		{
			bundle: true,
			dts: true,
			format: 'esm',
			sourcemap: true
		}
	],
	output: {
		target: 'web'
	},
	plugins: [pluginReact()]
})
