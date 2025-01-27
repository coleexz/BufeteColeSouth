export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
        keyframes:{
            xbounce: {
                '0%, 100%': { transform: 'translateX(-0.5rem)' },
                '50%': { transform: 'translateX(1rem)' },
            },
        },
        animation:{
            xbounce: 'xbounce 9s ease-in-out infinite',
        }
    },
  },
  plugins: [],
};
