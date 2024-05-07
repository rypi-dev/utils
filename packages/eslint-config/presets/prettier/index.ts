import { Options } from 'prettier'
import { publicPresetNames } from '../types'
import { createPreset } from '../shared'

export const prettier = createPreset<Options>({
  name: publicPresetNames.prettier,
  compile: ({ options }) => ({
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': options ? ['warn', options] : 'warn'
    }
  })
})
