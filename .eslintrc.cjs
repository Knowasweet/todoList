/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    'extends': [
        'prettier',
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        "prefer-const": "error",
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'name',
                    'directives',
                    'components',
                    'mixins',
                    ['provide', 'inject'],
                    'model',
                    'props',
                    'filters',
                    'data',
                    'computed',
                    'watch',
                    'methods',
                    'LIFECYCLE_HOOKS',
                    'ROUTER_GUARDS',
                ],
            },
        ],
        'vue/multi-word-component-names': 'off',
        'vue/next-tick-style': ['error', 'promise'],
        'vue/require-prop-types': 'error',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/no-duplicate-attr-inheritance': 'error',
        'vue/this-in-template': ['error', 'never'],
        'vue/v-on-style': ['error', 'shorthand'],
        'vue/no-multi-spaces': 'error',
        'vue/padding-line-between-blocks': 'error',
        'vue/component-tags-order': [
            'error',
            {
                order: ['template', 'script', 'style'],
            },
        ],
        'vue/v-on-event-hyphenation': ['error', 'never'],
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/v-bind-style': 'error',
        'vue/v-slot-style': ['error', 'shorthand'],
        'vue/no-unused-properties': [
            'error',
            {
                groups: ['props', 'data', 'computed', 'methods', 'setup'],
                ignorePublicMembers: true,
            },
        ],
    },
}
