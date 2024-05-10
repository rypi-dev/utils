import { EXTENSIONS } from '../../shared'
import { createPreset } from '../shared'
import { publicPresetNames } from '../types'
import { createAliasSettings } from './alias'
import { createExtensionsRule } from './lib'

export interface Options {
	alias?: {
		root?: string
		paths?: Record<string, string>
		jsconfig?: string
	}
}

export const imports = createPreset<Options>({
	name: publicPresetNames.imports,
	updateMeta: ({ meta }) => {
		meta.imports.extensions.push(...EXTENSIONS.MISC)
		meta.imports.extensions.push(...EXTENSIONS.JS)
	},
	compile: ({ options = {}, meta }) => {
		return {
			plugins: ['import'],
			settings: {
				'import/extensions': meta.imports.extensions,
				'import/core-modules': [],
				'import/ignore': ['\\.(scss|css|less|hbs|svg|json)$'],
				'import/internal-regex': '^@types/',
				...createAliasSettings({ options, meta })
			},
			rules: {
				'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
				'import/no-anonymous-default-export': 'error',
				'import/export': 'error',
				'import/no-mutable-exports': 'error',
				'import/no-amd': 'error',
				'import/first': 'error',
				'import/no-duplicates': 'error',
				'import/extensions': createExtensionsRule(meta.imports.extensions),
				'import/newline-after-import': 'warn',
				'import/no-webpack-loader-syntax': 'error',
				'import/no-self-import': 'error',
				'import/no-absolute-path': 'error',
				'import/no-named-default': 'error',
				'import/no-empty-named-blocks': 'error',
				'import/no-cycle': 'off', // TODO: turn on when execution time became normal
				// 'import/no-cycle': ['error', { maxDepth: Number.POSITIVE_INFINITY }],
				'import/no-useless-path-segments': ['error', { commonjs: true, noUselessIndex: true }],
				'import/order': ['error', { groups: ['builtin', 'external', 'internal'], 'newlines-between': 'always' }]
			}
		}
	}
})
