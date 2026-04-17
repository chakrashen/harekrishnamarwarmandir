/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#E67E22',
          light: '#F39C4A',
          dark: '#D35400',
        },
        gold: {
          DEFAULT: '#D4AF37',
          bright: '#E6C15A',
          dim: '#A38424',
        },
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-eb-garamond)', 'serif'],
        ui: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
