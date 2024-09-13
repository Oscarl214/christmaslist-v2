import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import { addDynamicIconSelectors } from '@iconify/tailwind';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('daisyui'),
    addDynamicIconSelectors(),
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            foreground: '#000000',
          },
        },
        dark: {
          layout: {},
          colors: {
            foreground: '#ffffff',
          },
        },
      },
    }),
  ],
};
export default config;
