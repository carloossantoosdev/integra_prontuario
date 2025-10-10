/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#275E65',
          foreground: '#ffffff',
          50: '#f0f7f8',
          100: '#d9ebec',
          200: '#b7d9db',
          300: '#89c0c3',
          400: '#58a0a5',
          500: '#3d8389',
          600: '#275E65',
          700: '#234f54',
          800: '#214146',
          900: '#20383c',
          950: '#0f2326',
        },
        secondary: {
          DEFAULT: '#1BA0A4',
          foreground: '#ffffff',
          50: '#f0fbfb',
          100: '#d9f4f5',
          200: '#b7e9eb',
          300: '#85d8dc',
          400: '#4cbfc5',
          500: '#1BA0A4',
          600: '#18858b',
          700: '#196971',
          800: '#1b545c',
          900: '#1b474e',
          950: '#0a2d34',
        },
        tertiary: {
          DEFAULT: '#90bc21',
          foreground: '#ffffff',
          50: '#f6fce8',
          100: '#eaf8ce',
          200: '#d6f1a2',
          300: '#bce56c',
          400: '#a4d540',
          500: '#90bc21',
          600: '#6a9516',
          700: '#507115',
          800: '#415a16',
          900: '#384c17',
          950: '#1c2a07',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
