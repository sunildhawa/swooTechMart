/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ensure your paths are correct
  ],
  theme: {
    extend: {
      // YAHAN SE ADD KAREIN ---
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      // --- YAHAN TAK
    },
  },
  plugins: [],
}