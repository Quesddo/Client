module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --cache --fix", "prettier --cache --write"],
  "*.{md,json}": ["prettier --cache --write"],
};
