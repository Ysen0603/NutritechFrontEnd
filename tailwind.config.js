/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translatey(-100%)" },
          "100%": { transform: "translatey(0)" },
        },
        slideOut: {
          "0%": { transform: "translatey(100%) " },
          "100%": { transform: "translatey(0%)" },
        },
        slideUp: {
          "0%": { transform: "translatey(-100%)" },
          "100%": { transform: "translatey(0%)" },
        },
        slideInRight: {
          '0%': { transform: 'translateX(0)'},
          '100%': { transform: 'translateX(-100%)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)'},
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        slideIn: 'slideIn 1s ease',
        slideOut: 'slideOut 1s ease',
        slideUp: 'slideUp 1s ease',
        'slide-in-right': 'slideInRight 1s ease-in',
        'slide-in-left': 'slideInLeft 1s ease-in',
        'slide-out-right': 'slideOutRight 1s ease-in',
        'slide-out-left': 'slideOutLeft 1s ease-in'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
