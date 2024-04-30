/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: { xl: '445px' },
    colors: {
      transparent: 'transparent',
      current: '#6B7280',
      slate: {
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
      },
      black: '#374151',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        300: '#E0E0E0',
        400: '#9CA3AF',
        500: '#6B7280',
        700: '#374151',
      },
      red: {
        50: '#FEF2F2',
        100: '#FFCDD2',
        300: '#E57373',
        600: '#E53935',
        800: '#C62828',
      },
      rose: {
        100: '#FCE7F3',
        600: '#E11D48',
      },
      green: {
        50: '#F0FDF4',
        300: '#81C784',
        600: '#16A34A',
        800: '#2E7D32',
        900: '#1B5E20',
      },
      emerald: {
        600: '#059669',
      },
      blue: {
        100: '#BBDEFB',
        200: '#90CAF9',
        600: '#1E88E5',
      },
      yellow: {
        100: '#FFF9C4',
        600: '#FDD835',
      },
      orange: {
        100: '#FFE0B2',
        600: '#FB8C00',
      },
      white: '#FFFFFF',
    },
    fontSize: {
      xs: [
        '12px',
        {
          lineHeight: '14.52px',
          fontWeight: '600',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '19.36px',
          fontWeight: '500',
        },
      ],
      '2xl': [
        '24px',
        {
          lineHeight: '29.05px',
          fontWeight: '800',
        },
      ],
      '7xl': [
        '72px',
        {
          lineHeight: '87.14px',
          fontWeight: '900',
        },
      ],
    },
    extend: {},
  },
  plugins: [],
}
