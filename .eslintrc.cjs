module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // eslint:recommended 和 plugin:@typescript-eslint/recommended 是两个已经存在的 ESLint 配置，它们可以提供一些默认的规则
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'off',
    // 'prettier/prettier': {
    //   'arrow-parens': [2, 'as-needed'],
    // },
  },
}
