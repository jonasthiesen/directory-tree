module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-up": {
          '0%': { transform: 'translateY(10px)', opacity: 0, },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease',
      },
    },
  },
  plugins: [],
}
