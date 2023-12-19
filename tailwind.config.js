/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "auth" : "#4F46E5",
        "primary" : "#4F46E5",
        "input" : "#F3F4F6"
      }
    },
  },
  plugins: [],
}

