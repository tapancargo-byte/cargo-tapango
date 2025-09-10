module.exports = {
  // Print width
  printWidth: 80,
  
  // Tab width
  tabWidth: 2,
  
  // Use tabs instead of spaces
  useTabs: false,
  
  // Semicolons
  semi: true,
  
  // Quotes
  singleQuote: true,
  
  // Quote props
  quoteProps: 'as-needed',
  
  // JSX quotes
  jsxSingleQuote: true,
  
  // Trailing commas
  trailingComma: 'es5',
  
  // Bracket spacing
  bracketSpacing: true,
  
  // JSX bracket same line
  bracketSameLine: false,
  
  // Arrow function parentheses
  arrowParens: 'always',
  
  // End of line
  endOfLine: 'lf',
  
  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',
  
  // React Native specific overrides
  overrides: [
    {
      files: '*.tsx',
      options: {
        printWidth: 100,
      }
    },
    {
      files: '*.json',
      options: {
        printWidth: 120,
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      }
    }
  ]
};
