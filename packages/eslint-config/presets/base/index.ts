import { readJson } from '../../shared/lib/fs'
import { Jsconfig, PackageJson } from '../../shared/types'
import { createPreset } from '../shared'
import { servicePresetNames } from '../types'

interface Options {
	root?: string
	allowDebug?: boolean
}

export const base = createPreset<Options>({
	name: servicePresetNames.base,
	updateMeta: ({ options = {}, meta }) => {
		const { root = process.cwd(), allowDebug = false } = options

		meta.root = root
		meta.allowDebug = allowDebug

		meta.readPackageJson = () => {
			return readJson<PackageJson>(root, 'package.json')
		}
		meta.readJsconfig = () => {
			return readJson<Jsconfig>(root, 'jsconfig.json')
		}
	},
	compile: ({ meta }) => {
		return {
			plugins: ['unicorn'],
			parser: '@typescript-eslint/parser',
			env: { es6: true },
			parserOptions: {
				requireConfigFile: false,
				ecmaVersion: 'latest',
				sourceType: 'module'
			},

			rules: {
				'no-async-promise-executor': 'error',
				'no-compare-neg-zero': 'error',
				'no-cond-assign': 'error',
				'no-constant-binary-expression': 'error',
				'no-constant-condition': 'error',
				'no-constructor-return': 'error',
				'no-debugger': meta.allowDebug ? 'off' : 'error',
				'no-dupe-args': 'error',
				'no-dupe-class-members': 'error',
				'no-dupe-else-if': 'error',
				'no-dupe-keys': 'error',
				'no-duplicate-case': 'error',
				'no-duplicate-imports': 'error',
				'no-empty-character-class': 'error',
				'no-empty-pattern': 'error',
				'no-ex-assign': 'error',
				'no-func-assign': 'error',
				'no-import-assign': 'error',
				'no-invalid-regexp': 'error',
				'no-irregular-whitespace': 'error',
				'no-misleading-character-class': 'error',
				'no-obj-calls': 'error',
				'no-promise-executor-return': 'error',
				'no-prototype-builtins': 'error',
				'no-self-assign': 'error',
				'no-self-compare': 'error',
				'no-setter-return': 'error',
				'no-sparse-arrays': 'error',
				'no-this-before-super': 'error',
				'no-undef': 'error',
				'no-var': 'error',
				'no-eval': 'error',
				'no-empty': 'error',
				'no-with': 'error',
				'no-unexpected-multiline': 'error',
				'no-unmodified-loop-condition': 'error',
				'no-global-assign': 'error',
				'no-unsafe-finally': 'error',
				'no-unsafe-negation': 'error',
				'no-unsafe-optional-chaining': 'error',
				'no-unused-private-class-members': 'error',
				'no-array-constructor': 'error',
				'no-empty-static-block': 'error',
				'consistent-this': 'error',
				'no-implied-eval': 'error',
				'no-multi-str': 'error',
				'no-new-func': 'error',
				'no-proto': 'error',
				'no-caller': 'error',
				'no-octal': 'error',
				'no-regex-spaces': 'error',
				'no-shadow-restricted-names': 'error',
				'no-throw-literal': 'error',
				'no-undef-init': 'error',
				'no-octal-escape': 'error',
				'no-useless-call': 'error',
				'no-useless-concat': 'error',
				'no-useless-computed-key': 'error',
				'no-useless-constructor': 'error',
				'no-useless-escape': 'error',
				'no-useless-rename': 'error',
				'no-object-constructor': 'error',
				'no-useless-backreference': 'error',
				'no-useless-return': 'error',
				'no-alert': meta.allowDebug ? 'off' : 'warn',
				'no-console': [
					meta.allowDebug ? 'off' : 'warn',
					{ allow: ['warn', 'error', 'info', 'group', 'groupEnd', 'table'] }
				],
				'no-else-return': ['error', { allowElseIf: false }],
				'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
				'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
				'no-redeclare': ['error', { builtinGlobals: false }],
				'no-unused-expressions': [
					'error',
					{ allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true, enforceForJSX: true }
				],
				'no-mixed-operators': [
					'error',
					{
						groups: [
							['==', '!=', '===', '!==', '>', '>=', '<', '<='],
							['&&', '||'],
							['in', 'instanceof']
						]
					}
				],

				radix: 'error',
				'dot-notation': 'error',
				'constructor-super': 'error',
				'for-direction': 'error',
				'getter-return': 'error',
				'new-cap': 'error',
				'default-param-last': 'error',
				'default-case-last': 'error',
				'prefer-object-has-own': 'error',
				'grouped-accessor-pairs': 'error',
				'prefer-promise-reject-errors': 'error',
				curly: ['error', 'all'],
				yoda: ['error', 'never'],
				'func-style': ['error', 'expression'],
				'prefer-arrow-callback': 'error',
				'arrow-parens': ['error', 'always'],
				'arrow-body-style': ['error', 'always'],
				'quote-props': ['error', 'as-needed'],
				'one-var': ['error', { initialized: 'never' }],
				eqeqeq: ['error', 'always', { null: 'ignore' }],
				'prefer-const': ['error', { destructuring: 'all' }],
				'use-isnan': ['error', { enforceForIndexOf: true }],
				'valid-typeof': ['error', { requireStringLiterals: true }],
				'object-shorthand': ['error', 'properties', { avoidQuotes: true }],
				'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

				// unicorn plugin
				'unicorn/consistent-destructuring': 'error',
				'unicorn/custom-error-definition': 'error',
				'unicorn/catch-error-name': 'error',
				'unicorn/error-message': 'error',
				'unicorn/escape-case': 'error',
				'unicorn/explicit-length-check': 'error',
				'unicorn/new-for-builtins': 'error',
				'unicorn/no-abusive-eslint-disable': 'warn',
				'unicorn/no-instanceof-array': 'error',
				'unicorn/no-console-spaces': 'warn',
				'unicorn/no-for-loop': 'warn',
				'unicorn/no-hex-escape': 'error',
				'unicorn/no-nested-ternary': 'error',
				'unicorn/no-new-buffer': 'error',
				'unicorn/no-unreadable-array-destructuring': 'error',
				'unicorn/no-zero-fractions': 'error',
				'unicorn/number-literal-case': 'error',
				'unicorn/prefer-add-event-listener': 'error',
				// 'unicorn/prefer-array-find': 'error', // rule does not exist but listed in docs
				'unicorn/prefer-dom-node-dataset': 'warn',
				'unicorn/prefer-keyboard-event-key': 'error',
				'unicorn/prefer-array-flat-map': 'warn',
				'unicorn/prefer-includes': 'error',
				'unicorn/prefer-negative-index': 'warn',
				'unicorn/prefer-dom-node-append': 'error',
				'unicorn/prefer-dom-node-remove': 'error',
				'unicorn/prefer-number-properties': 'error',
				'unicorn/prefer-query-selector': 'error',
				'unicorn/prefer-string-starts-ends-with': 'error',
				'unicorn/prefer-string-slice': 'error',
				'unicorn/prefer-dom-node-text-content': 'error',
				'unicorn/prefer-string-trim-start-end': 'warn',
				'unicorn/prefer-type-error': 'error',
				'unicorn/throw-new-error': 'error',
				'unicorn/better-regex': 'error',
				'unicorn/no-array-callback-reference': 'error',
				'unicorn/no-array-for-each': 'error',
				'unicorn/no-array-method-this-argument': 'error',
				'unicorn/no-document-cookie': 'error',
				'unicorn/no-empty-file': 'error',
				'unicorn/no-new-array': 'error',
				'unicorn/no-this-assignment': 'error',
				'unicorn/prefer-node-protocol': 'error',
				'unicorn/no-typeof-undefined': 'error',
				'unicorn/require-array-join-separator': 'error',
				'unicorn/prefer-modern-math-apis': 'error',
				'unicorn/template-indent': 'error',

				// eslint es6 rules
				'no-class-assign': 'error',
				'no-const-assign': 'error',
				'no-new-symbol': 'error',
				'prefer-rest-params': 'warn',
				'prefer-spread': 'warn',
				'require-yield': 'error'
			}
		}
	}
})
