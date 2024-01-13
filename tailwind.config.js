/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: '#6B7280',
      slate: {
        100: '#F1F5F9',
        200: '#E2E8F0',
        400: '#94A3B8',
      },
      black: '#374151',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        400: '#9CA3AF',
        500: '#6B7280',
        700: '#374151',
      },
      rose: {
        100: '#FCE7F3',
        600: '#E11D48',
      },
      green: {
        50: '#F0FDF4',
        600: '#16A34A',
      },
      emerald: {
        600: '#059669',
      },
      white: '#FFFFFF',
    },
    fontSize: {
      'xs': ['12px', {
        lineHeight: '14.52px',
        fontWeight: '600',
      }],
      'base': ['16px', {
        lineHeight: '19.36px',
        fontWeight: '500',
      }],
      '2xl': ['24px', {
        lineHeight: '29.05px',
        fontWeight: '800',
      }],
      '7xl': ['72px', {
        lineHeight: '87.14px',
        fontWeight: '900',
      }],
    },
    extend: {},
  },
  plugins: [],
}

