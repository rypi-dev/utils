import { publicPresetNames } from '../types'
import { createPreset } from '../shared'

export const astro = createPreset({
  name: publicPresetNames.astro,
  compile: () => ({
    extends: ['plugin:astro/recommended'],
    overrides: [
      {
        files: ['*.astro'],
        processor: 'astro/client-side.ts'
      }
    ]
  })
})
