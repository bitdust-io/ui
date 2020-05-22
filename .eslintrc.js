module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        semi: [
            2,
            'always'
        ],
        indent: 'off',
        'vue/script-indent': ['warn', 4, {
            baseIndent: 1
        }],
        'vue/html-indent': ['warn', 4, {
            baseIndent: 1
        }],
        'space-before-function-paren': [
            'error', { anonymous: 'ignore', named: 'never' }
        ],
        'generator-star-spacing': 0,
        'object-curly-spacing': [0, 'always']
    }
};
