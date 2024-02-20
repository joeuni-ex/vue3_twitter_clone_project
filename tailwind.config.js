/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 컬러 추가
        primary: "#1DA1F2",
        dark: "#1a91da",
        light: "#a5d0f5",
        lighter: "#D4E5F4",
      },
    },
  },
  plugins: [],
};
