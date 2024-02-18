module.exports = {
  root: true,
  // 集成其它规则，用来扩展配置
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-less',
    'stylelint-config-standard-vue',
  ],
  // 引入插件，用于扩展stylelint的原生rules
  plugins: ['stylelint-order'],
  // 为不同格式的文件分别配置
  overrides: [
    {
      files: ['**/*.{less | vue}'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'import-notation': 'string',
    'media-feature-range-notation': 'prefix',
    'color-function-notation': 'legacy',
    'order/properties-order': [],
  },
}
