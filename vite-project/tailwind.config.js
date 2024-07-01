/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // If using Just-in-Time mode
  darkMode: 'class', // Enable dark mode using class variant
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable dark mode variants for background colors
    },
  },
  
  plugins: [
    // require('flowbite/plugin'),
   
  ],
}

