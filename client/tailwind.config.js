/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        editorial: ['Caveat', 'cursive', 'Georgia', 'serif'],
        brand: ['Comfortaa', 'Quicksand', 'sans-serif'],
      },
      colors: {
        accio: {
          sage: {
            50: '#f7f9f3',
            100: '#eef3e5',
            200: '#e2ebd2',
            DEFAULT: '#d8e3c3',
            300: '#d8e3c3',
            400: '#c3d4a9',
            500: '#a3bb84',
            600: '#7e995e',
            700: '#5e7545',
            800: '#465834',
            900: '#2a361e',
          },
          navy: {
            DEFAULT: '#152e22',
            dark: '#0d1f17',
            deep: '#10261c',
            light: '#234b38',
          },
          forest: {
            DEFAULT: '#152e22',
            dark: '#0d1f17',
            deep: '#10261c',
            light: '#234b38',
          },
          blue: {
            DEFAULT: '#2d6a4f',
            hover: '#1e4d38',
            soft: '#40916c',
            light: '#52b788',
            glow: '#d8e3c3',
          },
          emerald: {
            DEFAULT: '#2d6a4f',
            hover: '#1e4d38',
            soft: '#40916c',
            light: '#52b788',
          },
          sky: {
            DEFAULT: '#d8e3c3',
            soft: '#e2ebd2',
            pale: '#eef3e5',
            ghost: '#f7f9f3',
          },
          slate: {
            50: '#f7f9f4',
            100: '#eef2ea',
            200: '#dfe6d7',
            300: '#c5d0bc',
            400: '#8c9c81',
            500: '#5c6d52',
            600: '#42513a',
            700: '#313d2b',
            800: '#212a1c',
            900: '#141b11',
          },
        },
      },
      boxShadow: {
        'soft-glow': '0 0 35px -5px rgba(216, 227, 195, 0.45)',
        'sage-glow': '0 0 45px -8px rgba(163, 187, 132, 0.35)',
        'blue-glow': '0 0 50px -10px rgba(45, 106, 79, 0.35)',
        'subtle-card': '0 10px 30px -10px rgba(20, 35, 25, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
        'wave-flow': 'waveFlow 16s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px)' },
        },
        waveFlow: {
          '0%': { transform: 'translateX(0) scaleY(1)' },
          '100%': { transform: 'translateX(-2%) scaleY(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
