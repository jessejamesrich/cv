/** @format */

module.exports = {
	env: {
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2021, // Or the ECMAScript version you're using
		sourceType: "module", // Set sourceType to "module" for ESM
	},
	ecmaVersion: 2021, // Or the ECMAScript version you're using
	sourceType: "module", // Set sourceType to "module" for ESM
	extends: ["eslint:recommended", "google"],
	rules: {
		"no-restricted-globals": ["error", "name", "length"],
		"prefer-arrow-callback": "error",
		quotes: ["error", "double", { allowTemplateLiterals: true }],
	},
	overrides: [
		{
			files: ["**/*.spec.*"],
			env: {
				mocha: true,
			},
			rules: {},
		},
	],
	globals: {},
};
