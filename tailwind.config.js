/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F1FF',
          100: '#E6E7FF',
          600: '#1a1b8f',
          700: '#0B0C7D',
          800: '#080961',
          900: '#050649',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#F8F9FA',
          100: '#DFE2E9',
          200: '#D0D5DE',
          300: '#B8BCC5',
          400: '#A0A5AD',
          500: '#888D95',
          600: '#70757D',
          700: '#585D65',
          800: '#40452D',
          900: '#282D35',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        modal: {
          bg: '#EDF0F8',
        },
      },
      spacing: {
        'modal-sm': '600px',
        'modal-md': '716px',
        'modal-lg': '1074px',
      },
      borderRadius: {
        'component': '10px',
        'modal': '12px',
      },
      fontSize: {
        'heading-1': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'heading-2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'heading-3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'label': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}

