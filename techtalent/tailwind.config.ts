import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        simpsons: ['Simpsonfont', 'sans-serif'], // Agrega la fuente aquí
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
