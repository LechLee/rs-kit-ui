/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		// Include UI-Kit components
		'../ui-kit/src/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {}
	},
	plugins: []
}
