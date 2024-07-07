module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '110': '26rem', // 사용자 정의 높이 값
      },
      boxShadow: {
        custom: "9px 13px 16px -4px rgba(0,0,0,0.4)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}