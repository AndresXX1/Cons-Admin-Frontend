/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ["src/**/*.{html,js,jsx,ts,tsx}", "index.html"],
  theme: {
    extend: {
      colors: {
        argenpesos: {
          yellow: "#FCD34D",
          black: "#111827",
          textos: "#575757",
          skyBlue: "#4DCCFF",
          white: "#FFF",
          gray: "#AAA",
          gray2: "#C4C4C4",
          red: "#ED1A00",
        },
      },
      fontFamily: {
        light: ["Helvetica Light", "sans-serif"],
        regular: ["Helvetica Regular", "sans-serif"],
        medium: ["Helvetica Medium", "sans-serif"],
        bold: ["Helvetica Bold", "sans-serif"],
        normal: ["Helvetica Regular", "sans-serif"],
      },
      keyframes: {
        "rotate-clockwise": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        "rotate-counterclockwise": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(-360deg)",
          },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-250%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        padelinkInput: {
          "0%": {
            transform: "scale(1)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "100%": {
            transform: "scale(1000)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
      animation: {
        rotateClockwise: "rotate-clockwise 2s infinite linear",
        rotateCounterClockwise: "rotate-counterclockwise 2s infinite linear",
        bounce: "bounce 1s ease-out infinite",
        padelinkInput: "padelinkInput 1s ease-in-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
  ],
};
