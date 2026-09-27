import type { Config } from 'tailwindcss'

// Same token names as mangodocs-ui's tailwind.config.ts, trimmed to what a
// marketing page uses — so a class copied between the two repos means the
// same colour in both.
const config: Config = {
  // hover: styles only apply on devices that can actually hover, so a tap on
  // a phone doesn't leave a button stuck in its hover state.
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        surface: {
          DEFAULT: 'var(--surface)',
          sunken: 'var(--surface-sunken)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        ink: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          text: 'var(--primary-text)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
          subtle: 'var(--primary-subtle)',
        },
        mango: {
          50: 'var(--mango-50)',
          100: 'var(--mango-100)',
          200: 'var(--mango-200)',
          300: 'var(--mango-300)',
          400: 'var(--mango-400)',
          500: 'var(--mango-500)',
          600: 'var(--mango-600)',
          700: 'var(--mango-700)',
          800: 'var(--mango-800)',
          900: 'var(--mango-900)',
          950: 'var(--mango-950)',
        },
        neutral: {
          0: 'var(--neutral-0)',
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
          950: 'var(--neutral-950)',
        },
        success: { 100: 'var(--success-100)', 500: 'var(--success-500)', 700: 'var(--success-700)' },
        danger: { 100: 'var(--danger-100)', 500: 'var(--danger-500)', 700: 'var(--danger-700)' },
        info: { 100: 'var(--info-100)', 500: 'var(--info-500)', 700: 'var(--info-700)' },
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4 Variable"', '"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        e1: 'var(--shadow-e1)',
        e2: 'var(--shadow-e2)',
        e3: 'var(--shadow-e3)',
      },
    },
  },
}

export default config
