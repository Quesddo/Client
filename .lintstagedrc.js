module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --cache --fix",
    "prettier --cache --write",
    "pnpm tsc --noEmit --skipLibCheck --allowJs",
    "pnpm run test --passWithNoTests",
  ],
  "*.{md,json}": ["prettier --cache --write"],
};
