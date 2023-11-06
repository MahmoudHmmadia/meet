/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradient_cloudy: "linear-gradient(90deg, #fefefe 0%, #dedede 100%)",
        gradient_sky: " linear-gradient(90deg, #2dc1e4 0%, #26a6c3 100%)",
        gradient_sunny: "linear-gradient(90deg, #ffe25a 0%, #ffa852 100%)",
      },
      colors: {
        main: "#2dc1e4",
        alt: "#2f455c",
      },
    },
  },
  plugins: [],
};
