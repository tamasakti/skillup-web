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
        "input" : "#F3F4F6",
        "main" : "#FFF2E1",
        "footer" : "#252641",
        "footerText" : "#B2B3CF"
      },
      backgroundImage : {
        "mentee" : "url('./src/assets/mentee.webp')",
        "instructor" : "url('./src/assets/instructor.webp')",
        

      }
    },
  },
  plugins: [require("daisyui")],
}

