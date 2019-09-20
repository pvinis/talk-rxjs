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
		semi: ['error', 'never'],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'comma-dangle': ['error', 'always-multiline'],
		'arrow-spacing': ['error'],
		'no-multi-spaces': ['error', { 'ignoreEOLComments': true }], // has exceptions too, if needed
		'key-spacing': ['error'],
		'no-console': 'off',
		'object-curly-spacing': ['error', 'always'],
		'no-unused-vars': 'off',


		'react/jsx-indent': ['error', 'tab'],
		'react/prop-types': 'off',
		'react/jsx-tag-spacing': 'error',

		'@typescript-eslint/explicit-function-return-type': 'off',

	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}


//     plugins: ['react'],
