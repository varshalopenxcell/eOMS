import type { Config } from 'tailwindcss';

/** rgb(var(--token) / <alpha-value>) — keeps opacity modifiers working with CSS-variable themes. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        'bg-deep': token('bg-deep'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        elevated: token('elevated'),
        line: token('line'),
        'line-strong': token('line-strong'),
        field: token('field'),

        fg: token('fg'),
        muted: token('muted'),
        subtle: token('subtle'),
        faint: token('faint'),

        brand: {
          DEFAULT: token('brand'),
          strong: token('brand-strong'),
          soft: token('brand-soft'),
          fg: token('brand-fg')
        },
        success: { DEFAULT: token('success'), soft: token('success-soft'), fg: token('success-fg') },
        warning: { DEFAULT: token('warning'), soft: token('warning-soft'), fg: token('warning-fg') },
        danger: { DEFAULT: token('danger'), soft: token('danger-soft'), fg: token('danger-fg') },
        info: { DEFAULT: token('info'), soft: token('info-soft'), fg: token('info-fg') },

        // Static brand ramp for gradients, charts, and marketing surfaces.
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81'
        }
      },
      borderRadius: {
        md: '0.5rem',
        lg: '0.625rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(var(--shadow-color) / 0.05)',
        card: '0 1px 2px rgb(var(--shadow-color) / 0.04), 0 2px 8px rgb(var(--shadow-color) / 0.04)',
        soft: '0 4px 24px rgb(var(--shadow-color) / 0.06)',
        lift: '0 4px 12px rgb(var(--shadow-color) / 0.06), 0 20px 40px -16px rgb(var(--shadow-color) / 0.22)',
        elevated: '0 24px 56px -20px rgb(var(--shadow-color) / 0.36)',
        glow: '0 0 0 1px rgb(var(--brand) / 0.30), 0 10px 28px -10px rgb(var(--brand) / 0.5)',
        focus: '0 0 0 4px rgb(var(--brand) / 0.16)'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        'brand-sheen': 'linear-gradient(135deg, rgb(255 255 255 / 0.18), transparent 45%)'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      letterSpacing: { tightest: '-0.03em' },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};

export default config;
