import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#081117",
        steel: "#99a9b5",
        cyan: "#8ff4ff",
        slateBlue: "#15242e",
      },
      fontFamily: {
        display: ["Avenir Next", "Segoe UI", "sans-serif"],
        body: ["IBM Plex Sans", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        panel: "0 20px 80px rgba(0, 0, 0, 0.28)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(143, 244, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(143, 244, 255, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
