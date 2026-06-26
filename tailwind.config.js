/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#0D0D0D',
        muted: '#111111',
        border: 'rgba(255,255,255,0.08)',
        accent: '#F5F5F5'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px rgba(255,255,255,0.04)'
      }
    }
  },
  plugins: []
};
