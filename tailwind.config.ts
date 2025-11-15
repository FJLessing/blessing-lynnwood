import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      // Typography - Font Families
      fontFamily: {
        primary: ['Outfit', 'sans-serif'],
        secondary: ['Satisfy', 'cursive'],
      },

      // Typography - Font Sizes with Line Heights
      fontSize: {
        // Headings
        'heading-1': ['40px', { lineHeight: '1', fontWeight: '500' }],
        'heading-2': ['32px', { lineHeight: '1', fontWeight: '400' }],
        'heading-3': ['28px', { lineHeight: '1', fontWeight: '400' }],

        // Subheadings
        'subheading-1': ['24px', { lineHeight: '1', fontWeight: '400' }],
        'subheading-2': ['18px', { lineHeight: '24px', fontWeight: '500' }],

        // Body Text
        'body-1': ['16px', { lineHeight: '1', fontWeight: '300' }],
        'body-2': ['14px', { lineHeight: '1', fontWeight: '300' }],

        // Button Text
        button: ['16px', { lineHeight: '1', fontWeight: '400' }],
      },

      // Font Weights
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
      },

      // Colors
      colors: {
        // Primary Dark Green
        primary: {
          60: '#222e0d',
          50: '#364025',
          DEFAULT: '#364025',
        },

        // Sage Green
        sage: {
          60: '#626744',
          50: '#899064',
          40: '#b1b986',
          30: '#d9e2ab',
          20: '#f6ffc9',
          DEFAULT: '#899064',
        },

        // Lime Green
        lime: {
          60: '#64734a',
          50: '#94a676',
          40: '#c7d9a9',
          30: '#f0ffd8',
          DEFAULT: '#94a676',
        },

        // Yellow-Green
        'yellow-green': {
          60: '#596234',
          50: '#899556',
          40: '#b9c87c',
          30: '#eafba6',
          20: '#f5ffcf',
          DEFAULT: '#b9c87c',
        },

        // Gold/Bronze
        gold: {
          60: '#786336',
          50: '#ab915a',
          40: '#dec285',
          30: '#ffe4ac',
          20: '#fff0d1',
          DEFAULT: '#ab915a',
        },

        // Tan/Beige
        tan: {
          60: '#554937',
          50: '#7d6e55',
          40: '#a69476',
          30: '#cfbb9a',
          20: '#f8e3c0',
          DEFAULT: '#cfbb9a',
        },
      },
    },
  },
} satisfies Config;
