module.exports = {
    extends: 'airbnb-base/legacy',
    parserOptions: {
        ecmaVersion: 6
    },
    overrides: [{
        files: '*.test.js',
        globals: {
            describe: true,
            it: true
        },
        rules: {
            "no-unused-expressions": "off"
        }
    }]
}