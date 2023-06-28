/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'custom-orange': '#f89c3c',
        'custom-blue': '#6ED4D4',
        'background': '#F2F1F0',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      textColor: ['placeholder'],  // <-- add this line
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
