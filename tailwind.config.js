/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './templates/**/*.html',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'primary': '#181717',
    }
  }
}

