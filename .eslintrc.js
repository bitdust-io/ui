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
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': [
            2,
            'always'
        ],
        'indent': 'off',
        'space-before-function-paren': [
            'error', {'anonymous': 'ignore', 'named': 'never'}
        ],
        'generator-star-spacing': 0,
        'object-curly-spacing': [0, 'always']
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
