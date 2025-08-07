import type { Config } from 'tailwindcss';
// Add this import for PluginAPI type
import type { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#ff3b38',
      },
      keyframes: {
        'slide-in': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out': {
            from: { transform: 'translateY(0)', opacity: '1' },
            to: { transform: 'translateY(10px)', opacity: '0' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.2s ease-out forwards',
        'slide-out': 'slide-out 0.2s ease-in forwards',
      },
    },
  },
  plugins: [
    require('@vidstack/react/tailwind.cjs')({
      prefix: 'media',
    }),
    // Add type annotation to the plugin function parameter
    function (api: PluginAPI) {
      api.matchVariant('parent-data', (value) => `.parent[data-${value}] > &`);
    },
  ],
};
export default config;