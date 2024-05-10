import { Options } from 'prettier'

import { createPreset } from '../shared'
import { publicPresetNames } from '../types'

export const prettier = createPreset<Options>({
	name: publicPresetNames.prettier,
	compile: ({ options }) => {
		return {
			plugins: ['prettier'],
			rules: {
				'prettier/prettier': options ? ['warn', options] : 'warn'
			}
		}
	}
})
