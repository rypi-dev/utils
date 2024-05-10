import { publicPresetNames } from '../types'
import { createPreset } from '../shared'

export const astro = createPreset({
	name: publicPresetNames.astro,
	compile: () => ({
		env: { node: true }
	})
})
