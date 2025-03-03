module.exports = {
  reactStrictMode: false,

  eslint: {
    // Disable specific ESLint rules
    ignoreDuringBuilds: true,  // Optional: Disables ESLint during production build
    rules: {
      'react/no-unescaped-entities': 'off',  // Disable the rule
      'no-console': 'warn',
    },
  },
}
