import path from 'node:path'

import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../types'
import { Meta } from '../shared'
import { Options } from '.'

interface Input {
	options?: Options
	meta: Meta
}

// https://www.npmjs.com/package/eslint-import-resolver-custom-alias
// This plugin will help you configure eslint-plugin-import to allow customized alias and extensions.

export const createAliasSettings = ({ options = {}, meta }: Input) => {
	const { root = meta.root, paths = {} } = options

	const alias = Object.entries(paths).reduce<Record<string, string>>((alias, [key, value]) => {
		alias[key] = path.join(root, value)
		return alias
	}, {})

	return {
		'import/resolver': {
			'eslint-import-resolver-custom-alias': { alias, extensions: meta.imports.extensions },
			...conditional.settings(meta.presets.has(publicPresetNames.typescript), {
				typescript: {
					alwaysTryTypes: true,
					project: meta.typescript.tsconfig
				}
			})
		}
	}
}
