const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './frontend/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#285c9a',
          dark: '#1e4a80',
          darker: '#0d1f35',
          light: '#4a7bbf',
          pale: '#e8f0fa',
          accent: '#0284c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 30px -10px rgba(13, 31, 53, 0.08), 0 4px 6px -2px rgba(13, 31, 53, 0.03)',
        'elevated-hover': '0 20px 40px -15px rgba(40, 92, 154, 0.16), 0 8px 12px -4px rgba(13, 31, 53, 0.04)',
        'inner-bezel': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
