/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        neue: ["Comic Neue", "cursive"],
        italia: ["Italianno", "cursive"],
        soon: ["Coming Soon", "cursive"],
        lato: ["Lato", "sans-serif"],
        cascadia: ["Cascadia Code", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      fontWeight: {
        "neue-bold": 900,
      },

      screens: {
        xs: "375px", // Extra small screens
        sm: "640px", // Small screens
        md: "768px", // Medium screens
        lg: "1024px", // Large screens
        xl: "1280px", // Extra large scr
      },
    },
  },
  plugins: [],
};
