export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'app-gradient': 'linear-gradient(to bottom right, #4A90E2, #A8D8FF)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
};