/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#871cf8',
        secondary: '#f8c51c',
        danger: '#f8711c',
        success: '#1cf8d1',
        warning: '#f8b41c',
        info: '#1c8cf8',
        "background-100": "#292929",
        "background-200": "#333333",
        "background-300": "#3d3d3d",
        "background-400": "#474747",
      }
    },
  },
  plugins: [],
}
