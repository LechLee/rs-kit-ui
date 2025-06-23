/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./components/**/*.{ts,tsx}', './index.ts'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: {
					DEFAULT: 'var(--primary-1)',
					foreground: 'var(--primary-foreground)',
					1: 'var(--primary-1)',
					2: 'var(--primary-2)',
					3: 'var(--primary-3)',
					4: 'var(--primary-4)',
					5: 'var(--primary-5)'
				},
				secondary: {
					DEFAULT: 'var(--secondary-1)',
					foreground: 'var(--secondary-foreground)',
					1: 'var(--secondary-1)',
					2: 'var(--secondary-2)',
					3: 'var(--secondary-3)',
					4: 'var(--secondary-4)',
					5: 'var(--secondary-5)'
				},
				tertiary: {
					DEFAULT: 'var(--tertiary-1)',
					foreground: 'var(--tertiary-foreground)',
					1: 'var(--tertiary-1)',
					2: 'var(--tertiary-2)',
					3: 'var(--tertiary-3)',
					4: 'var(--tertiary-4)',
					5: 'var(--tertiary-5)'
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				error: {
					DEFAULT: 'var(--error-1)',
					1: 'var(--error-1)',
					2: 'var(--error-2)',
					3: 'var(--error-3)',
					4: 'var(--error-4)',
					5: 'var(--error-5)',
					6: 'var(--error-6)'
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)'
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)'
				},
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)'
				},
				chart: {
					1: 'var(--chart-1)',
					2: 'var(--chart-2)',
					3: 'var(--chart-3)',
					4: 'var(--chart-4)',
					5: 'var(--chart-5)'
				},
				sidebar: {
					DEFAULT: 'var(--sidebar-background)',
					foreground: 'var(--sidebar-foreground)',
					primary: 'var(--sidebar-primary)',
					'primary-foreground': 'var(--sidebar-primary-foreground)',
					accent: 'var(--sidebar-accent)',
					'accent-foreground': 'var(--sidebar-accent-foreground)',
					border: 'var(--sidebar-border)',
					ring: 'var(--sidebar-ring)'
				},

				//Color System - Direct access to brand colors
				// Basics
				black: 'var(--black)',
				white: 'var(--white)',

				// Greys
				grey: {
					1: 'var(--grey-1)',
					2: 'var(--grey-2)',
					3: 'var(--grey-3)',
					4: 'var(--grey-4)',
					5: 'var(--grey-5)',
					6: 'var(--grey-6)'
				},

				// Primary (Maroon)
				maroon: {
					1: 'var(--maroon-1)',
					2: 'var(--maroon-2)',
					3: 'var(--maroon-3)',
					DEFAULT: 'var(--maroon-1)'
				},

				// Secondary (Blue)
				blue: {
					1: 'var(--blue-1)',
					2: 'var(--blue-2)',
					3: 'var(--blue-3)',
					DEFAULT: 'var(--blue-1)'
				},

				// Tertiary (Accent Colors)
				yellow: 'var(--yellow)',
				'sky-blue': 'var(--sky-blue)',
				green: 'var(--green)',
				cyan: 'var(--cyan)',
				red: 'var(--red)',

				// Hyperlinks
				hyperlink: 'var(--hyperlink)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				ripple: {
					'0%': {
						width: '0px',
						height: '0px',
						opacity: '0'
					},
					'25%': {
						opacity: '0.5'
					},
					'100%': {
						width: '200px',
						height: '200px',
						opacity: '0'
					}
				},
				'circular-fade': {
					'0%, 39%, 100%': {
						opacity: '0'
					},
					'40%': {
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				ripple: 'ripple 0.4s ease-out',
				'circular-fade': 'circular-fade 1s linear infinite'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
}
