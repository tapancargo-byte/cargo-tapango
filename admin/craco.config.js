const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/data': path.resolve(__dirname, 'src/data'),
    },
  },
  style: {
    postcss: {
      plugins: [
        require('@tailwindcss/postcss'),
        require('autoprefixer'),
      ],
    },
  },
};
