module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // CSS optimization for production
    ...(process.env.NODE_ENV === 'production' ? [
      require('cssnano')({
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyParams: true,
          minifySelectors: true,
          reduceIdents: false, // Keep this false to avoid breaking CSS custom properties
          zindex: false // Keep this false to avoid z-index conflicts
        }]
      })
    ] : [])
  ]
}