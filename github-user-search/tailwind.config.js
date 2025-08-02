module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gh-dark": "#24292e",
        "gh-blue": "#0366d6",
        "gh-light-blue": "#2188ff",
        "gh-gray": "#6a737d",
        "gh-light-gray": "#e1e4e8",
        "gh-lighter-gray": "#f6f8fa",
        "gh-red": "#cb2431",
        "gh-green": "#28a745",
      },
      boxShadow: {
        "gh-sm": "0 1px 3px rgba(0, 0, 0, 0.12)",
        "gh-md": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "gh-lg": "0 10px 15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
