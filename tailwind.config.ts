import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F5F7FA',
          100: '#E8EEF5',
          200: '#C9D5E3',
          300: '#9AAFC5',
          400: '#6B85A3',
          500: '#4A6282',
          600: '#34496A',
          700: '#1F3251',
          800: '#14213D',
          900: '#0A1628',
          950: '#050B16',
        },
        aqua: {
          50: '#EDF9FF',
          100: '#D6F1FF',
          200: '#B5E7FF',
          300: '#83D8FF',
          400: '#48BFFF',
          500: '#1EA0FF',
          600: '#0080F5',
          700: '#0066D3',
          800: '#0855AB',
          900: '#0D4987',
          950: '#0A2E57',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'serif'],
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 2.5s ease-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, transparent, #0A1628)',
        'aqua-gradient': 'linear-gradient(135deg, #0D4987 0%, #1EA0FF 50%, #48BFFF 100%)',
        'ink-gradient': 'linear-gradient(180deg, #0A1628 0%, #14213D 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
