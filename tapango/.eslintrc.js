module.exports = {
  extends: [
    'expo',
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'react-native',
    'jest'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  env: {
    'jest/globals': true
  },
  rules: {
    // TypeScript strict rules
'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
'@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
'@typescript-eslint/no-require-imports': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    
    // React/React Native rules
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'off', // React 17+
    'react/react-in-jsx-scope': 'off', // React 17+
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    
    // General code quality
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    
    // Import rules
'sort-imports': ['warn', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: true
    }],
    'no-void': 'off',
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: ['**/src/components/ui/**'],
          message: 'Import UI components from src/ui instead. Use Tamagui components as the single source of truth.'
        },
        {
          group: ['react-native-elements', '@react-native-community/ui-*', 'native-base'],
          message: 'Use Tamagui components instead of external UI libraries.'
        }
      ]
    }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: [
    'node_modules/',
    '.expo/',
    'dist/',
    'build/',
    '*.config.js'
  ]
};
