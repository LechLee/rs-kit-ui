const uiKitConfig = require('../ui-kit/tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...uiKitConfig,
  content: [
    './src/**/*.{ts,tsx}',
    '../ui-kit/components/**/*.{ts,tsx}'
  ],
  theme: {
    ...uiKitConfig.theme,
    extend: {
      ...uiKitConfig.theme.extend,
      colors: {
        ...uiKitConfig.theme.extend.colors,
        // Color Story specific colors
        'primary-color': {
          1: 'var(--primary-color-1)',
          2: 'var(--primary-color-2)',
          3: 'var(--primary-color-3)'
        },
        'secondary-color': {
          1: 'var(--secondary-color-1)',
          2: 'var(--secondary-color-2)',
          3: 'var(--secondary-color-3)',
          4: 'var(--secondary-color-4)',
          5: 'var(--secondary-color-5)',
          6: 'var(--secondary-color-6)',
          7: 'var(--secondary-color-7)',
          8: 'var(--secondary-color-8)',
          9: 'var(--secondary-color-9)'
        }
      },
      backgroundImage: {
        'gradient-1': 'var(--gradient-1)',
        'gradient-2': 'var(--gradient-2)',
        'gradient-3': 'var(--gradient-3)',
        'gradient-4': 'var(--gradient-4)'
      }
    }
  }
}