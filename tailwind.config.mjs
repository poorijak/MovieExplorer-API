/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        bannerImg: "url('/travel-banner.jpg')",
        blackOverlay_1: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
        blackOverlay_2: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%),
linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)
`,
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};
