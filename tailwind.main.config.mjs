import baseConfig from "./tailwind.config.mjs";

/** @type {import('tailwindcss').Config} */
const mainConfig = {
  ...baseConfig,
  content: [
    "./src/app/(main)/**/*.{js,jsx,ts,tsx,mdx}",
    "!./src/app/(main)/**/backup_*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
};

export default mainConfig;
