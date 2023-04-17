/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./*.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      dark: "#121212",
      "dark-200": "#0F1015",
    },
    screens: {
      mobile: "400px",

      tablet: "640px",

      laptop: "1024px",

      desktop: "1280px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
