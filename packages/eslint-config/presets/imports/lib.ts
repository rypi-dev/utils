import type { Linter } from 'eslint'
import { EXTENSIONS } from '../../shared'

export const createExtensionsRule = (extensions: string[]) => {
	return [
		'warn',
		'ignorePackages',
		Object.fromEntries(
			extensions.filter((ext) => !EXTENSIONS.MISC.includes(ext)).map((ext) => [ext.slice(1), 'never'])
		)
	] as Linter.RuleEntry
}
