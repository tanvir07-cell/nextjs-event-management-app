import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  darkMode: "class",

  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            foreground: "#000",
            background: "#f0f0f0",
          },
        },
        dark: {
          // ...
          colors: {
            foreground: "#fff",
            background: "#101415",
          },
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
