import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ====================================================================
      // COLORS (BAROQUE PALETTE)
      // ====================================================================
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
        },
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
          950: 'var(--color-accent-950)',
        },
        jewel: {
          purple: 'var(--color-jewel-purple)',
          emerald: 'var(--color-jewel-emerald)',
          ruby: 'var(--color-jewel-ruby)',
          sapphire: 'var(--color-jewel-sapphire)',
          amber: 'var(--color-jewel-amber)',
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          light: 'var(--color-gold-light)',
          dark: 'var(--color-gold-dark)',
        },
        bronze: 'var(--color-bronze)',
        silver: 'var(--color-silver)',
      },

      // ====================================================================
      // TYPOGRAPHY
      // ====================================================================
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Georgia', 'serif'],
      },
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: 'var(--leading-normal)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--leading-normal)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--leading-normal)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--leading-normal)' }],
        xl: ['var(--text-xl)', { lineHeight: 'var(--leading-snug)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-snug)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-snug)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-tight)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--leading-tight)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--leading-tight)' }],
        '7xl': ['var(--text-7xl)', { lineHeight: 'var(--leading-tight)' }],
        '8xl': ['var(--text-8xl)', { lineHeight: 'var(--leading-tight)' }],
        '9xl': ['var(--text-9xl)', { lineHeight: 'var(--leading-tight)' }],
      },
      lineHeight: {
        tight: 'var(--leading-tight)',
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
        loose: 'var(--leading-loose)',
      },
      letterSpacing: {
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
        widest: 'var(--tracking-widest)',
      },

      // ====================================================================
      // SPACING
      // ====================================================================
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        32: 'var(--space-32)',
        40: 'var(--space-40)',
        48: 'var(--space-48)',
        56: 'var(--space-56)',
        64: 'var(--space-64)',
      },

      // ====================================================================
      // ANIMATION & TRANSITIONS
      // ====================================================================
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        medium: 'var(--duration-medium)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
        slowest: 'var(--duration-slowest)',
      },
      transitionTimingFunction: {
        linear: 'var(--ease-linear)',
        in: 'var(--ease-in)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        bounce: 'var(--ease-bounce)',
        dramatic: 'var(--ease-dramatic)',
        smooth: 'var(--ease-smooth)',
      },

      // ====================================================================
      // Z-INDEX
      // ====================================================================
      zIndex: {
        base: '0',
        texture: '1',
        content: '10',
        'ornament-bg': '5',
        'ornament-fg': '15',
        sticky: '100',
        nav: '200',
        overlay: '500',
        modal: '1000',
        tooltip: '1500',
        toast: '2000',
      },

      // ====================================================================
      // SHADOWS
      // ====================================================================
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-base)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
      },

      // ====================================================================
      // BORDER RADIUS
      // ====================================================================
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-base)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },

      // ====================================================================
      // CONTAINER
      // ====================================================================
      maxWidth: {
        container: 'var(--container-max)',
        chapter: 'var(--chapter-max)',
        section: 'var(--section-max)',
      },

      // ====================================================================
      // BACKGROUNDS
      // ====================================================================
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-at-t': 'radial-gradient(circle at top, var(--tw-gradient-stops))',
        'gradient-radial-at-b': 'radial-gradient(circle at bottom, var(--tw-gradient-stops))',
        'gradient-radial-at-l': 'radial-gradient(circle at left, var(--tw-gradient-stops))',
        'gradient-radial-at-r': 'radial-gradient(circle at right, var(--tw-gradient-stops))',
        'gradient-radial-at-tl': 'radial-gradient(circle at top left, var(--tw-gradient-stops))',
        'gradient-radial-at-tr': 'radial-gradient(circle at top right, var(--tw-gradient-stops))',
        'gradient-radial-at-bl': 'radial-gradient(circle at bottom left, var(--tw-gradient-stops))',
        'gradient-radial-at-br': 'radial-gradient(circle at bottom right, var(--tw-gradient-stops))',
      },

      // ====================================================================
      // BREAKPOINTS (already defined by Tailwind, extended here)
      // ====================================================================
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    // Custom plugin for baroque utilities
    function ({ addUtilities }: any) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-1500': {
          perspective: '1500px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
      });
    },
  ],
};

export default config;
