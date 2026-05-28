import type { Config } from 'tailwindcss';

const config: Config = {
  // Tailwind only applies to new surfaces (admin, blog templates).
  // Legacy/ported marketing pages keep their custom CSS in app/globals.css.
  content: [
    './app/(admin)/**/*.{ts,tsx}',
    './app/admin/**/*.{ts,tsx}',
    './app/blog/**/*.{ts,tsx}',
    './components/admin/**/*.{ts,tsx}',
    './components/blog/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#16140f',
        cream: '#f5f1e6',
        rust: '#b85c38',
        gold: '#c9a961',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
