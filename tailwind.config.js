/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'rich-black': '#0A0A0A',
        'off-white': '#E0E0E0',
        'mid-gray': '#808080',
        'dark-gray': '#1A1A1A',
        'darker-gray': '#2A2A2A',
        'muted-blue': '#5B9BD5',
        'subtle-red': '#CC4444',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'IBM Plex Mono', 'Roboto Mono', 'monospace'],
      },
      spacing: {
        '4': '8px',
        '8': '16px',
        '12': '24px',
        '16': '32px',
        '24': '48px',
        '32': '64px',
      },
    },
  },
  plugins: [],
};


