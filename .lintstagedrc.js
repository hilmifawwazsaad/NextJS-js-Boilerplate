module.exports = {
  '**/*.{js,jsx}': (files) => [
    `pnpm lint:strict ${files.map((f) => `"${f}"`).join(' ')}`,
    `pnpm format:write ${files.map((f) => `"${f}"`).join(' ')}`,
  ],
  '**/*.{json,md,css}': (files) =>
    `pnpm format:write ${files.map((f) => `"${f}"`).join(' ')}`,
};
