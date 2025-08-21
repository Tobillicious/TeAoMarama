/** @type {import(tailwindcss).Config} */
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
          dark: 'var(--color-dark)',
          link: 'var(--color-link)
        },
        // Map standard Tailwind color names to our design system
        background: 'var(--color-bg)',
        foreground: 'var(--color-text)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted)
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'white
        }
      },
      borderRadius: {
        md: 'var(--radius-sm)',
        lg: 'var(--radius-lg)
      },
      letterSpacing: {
        nav: 'var(--letter-nav)',
        sub: 'var(--letter-sub)',
        body: 'var(--letter-body)
      },
      spacing: {1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '6': 'var(--space-6)
      },
      fontSize: {scale-h1': 'var(--type-scale-h1)',
        'scale-h2': 'var(--type-scale-h2)',
        'scale-h3': 'var(--type-scale-h3)
      },
      animation: {fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-in-out
      }
    },
  },
  plugins: [],
};
