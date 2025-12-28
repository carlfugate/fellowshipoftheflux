/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Hugo content files
    './content/**/*.{html,md}',
    './layouts/**/*.html',
    './themes/tailbliss/layouts/**/*.html',
    './themes/tailbliss/assets/**/*.js',
    // Include any custom assets
    './assets/**/*.{js,ts}',
    // Include static files that might contain classes
    './static/**/*.html'
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Custom colors matching the theme's OKLCH color system
      colors: {
        primary: {
          50: 'oklch(96.2% .018 272.314)',
          100: 'oklch(93% .034 272.788)',
          200: 'oklch(87% .065 274.039)',
          300: 'oklch(78.5% .115 274.713)',
          400: 'oklch(67.3% .182 276.935)',
          500: 'oklch(58.5% .233 277.117)', // Default primary
          600: 'oklch(51.1% .262 276.966)',
          700: 'oklch(45.7% .24 277.023)',
          800: 'oklch(39.8% .195 277.366)',
          900: 'oklch(35.9% .144 278.697)',
          950: 'oklch(25.7% .09 281.288)',
        },
        secondary: {
          50: 'oklch(97.1% .014 343.198)',
          100: 'oklch(94.8% .028 342.258)',
          200: 'oklch(89.9% .061 343.231)',
          300: 'oklch(82.3% .12 346.018)',
          400: 'oklch(71.8% .202 349.761)',
          500: 'oklch(65.6% .241 354.308)', // Default secondary
          600: 'oklch(59.2% .249 .584)',
          700: 'oklch(52.5% .223 3.958)',
          800: 'oklch(45.9% .187 3.815)',
          900: 'oklch(40.8% .153 2.432)',
          950: 'oklch(28.4% .109 3.907)',
        },
        neutral: {
          50: 'oklch(98.5% 0 0)',
          100: 'oklch(97% 0 0)',
          200: 'oklch(92.2% 0 0)',
          300: 'oklch(87% 0 0)',
          400: 'oklch(70.8% 0 0)',
          500: 'oklch(55.6% 0 0)', // Default neutral
          600: 'oklch(43.9% 0 0)',
          700: 'oklch(37.1% 0 0)',
          800: 'oklch(26.9% 0 0)',
          900: 'oklch(20.5% 0 0)',
          950: 'oklch(14.5% 0 0)',
        }
      },
      // Custom typography
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
      },
      // Custom prose styles
      typography: {
        '2xl': {
          css: {
            'max-width': '80ch',
            'font-size': '110%',
          }
        }
      },
      // Custom aspect ratios
      aspectRatio: {
        'square': '1 / 1',
        'video': '16 / 9',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // Safelist important classes that might be used dynamically
  safelist: [
    // Layout & Spacing patterns
    'container', 'mx-auto',
    // Flexbox & Grid patterns  
    'flex', 'grid', 'items-center', 'justify-center',
    // Common utility patterns
    'hidden', 'block', 'inline-block',
    // Responsive patterns
    'sm:block', 'md:flex', 'lg:grid',
    // Dark mode patterns
    'dark:bg-gray-900', 'dark:text-white',
    // Custom classes
    'prose-2xl', 'hero-container', 'hero-image',
    'aspect-square', 'aspect-video'
  ]
}