/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Authentic Dutch Delft Blue Color Palette
        delft: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#baddff',
          300: '#7cc4ff',
          400: '#38a3ff',
          500: '#0e7fff',
          600: '#0056d6',
          700: '#0042a8',
          800: '#003082', // Authentic Delfts Blauw
          900: '#001f5c',
          950: '#001238',
        },
        dutch: {
          // Traditional Dutch colors
          orange: '#ff6600',
          red: '#ae2012',
          white: '#fefefe',
          blue: '#003082', // Authentic Delfts Blauw
          // Rotterdam architecture inspired
          steel: '#64748b',
          concrete: '#94a3b8',
          glass: '#e2e8f0',
          // Rotterdam specific colors
          erasmus: '#c0c0c0', // Erasmus bridge steel
          maas: '#4a90a4', // Maas river blue
          kubik: '#f4d03f', // Kubuswoningen yellow
          port: '#2c3e50', // Port industrial
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 