module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blueExtend: "#020D92",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
