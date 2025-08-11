/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-accent)',
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          dark: 'var(--color-dark)'
        }
      },
      borderRadius: {
        md: 'var(--radius-sm)',
        lg: 'var(--radius-lg)'
      },
      letterSpacing: {
        nav: '0.05em',
        sub: '0.02em'
      }
    },
  },
  plugins: [],
};
