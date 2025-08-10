import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme~="nova-works"]', '[data-theme~="nova-haven"]', '[data-theme~="pixel-verse"]', '[data-theme~="curry-landing"]'],
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
}

export default config


