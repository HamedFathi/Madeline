const path = require("path");
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: path.resolve(__dirname, "./tsconfig.json"),
        tsconfigRootDir: './',
        "warnOnUnsupportedTypeScriptVersion": false
    },
    rules: {
    }
}