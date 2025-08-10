import type { Config } from 'tailwindcss'

const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: 'var(--radius)'
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)'
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)'
      }
    }
  },
  plugins: []
} satisfies Config

export default config


