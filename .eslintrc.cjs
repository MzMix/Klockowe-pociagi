/* eslint-disable no-undef */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-extra-semi": ["error"],
        "no-var": ["error"],
        "semi": ["error", "always"],
        "camelcase": ["error", { "properties": "always" }]
    }
};