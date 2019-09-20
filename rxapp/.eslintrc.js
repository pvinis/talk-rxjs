const OFF = 'off'
const WARN = 'warn'
const ERR = 'error'

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		semi: [ERR, 'never'],
		indent: [ERR, 'tab'],
		quotes: [ERR, 'single'],
		'comma-dangle': [ERR, 'always-multiline'],
		'arrow-spacing': ERR,
		'no-multi-spaces': [ERR, { 'ignoreEOLComments': true }], // has exceptions too, if needed
		'key-spacing': ['error'],
		'no-console': OFF,
		'object-curly-spacing': [ERR, 'always'],
		'no-unused-vars': OFF,

		'@typescript-eslint/explicit-function-return-type': OFF,
		'@typescript-eslint/no-unused-vars': OFF,
		'@typescript-eslint/camelcase': OFF,

		'react/jsx-indent': [ERR, 'tab'],
		'react/prop-types': OFF,
		'react/jsx-tag-spacing': ERR,

		'react-hooks/rules-of-hooks': ERR,
		'react-hooks/exhaustive-deps': WARN,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
