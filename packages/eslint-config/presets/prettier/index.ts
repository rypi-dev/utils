import { Options } from 'prettier'

import { createPreset } from '../shared'
import { publicPresetNames } from '../types'

export const prettier = createPreset<Options>({
  name: publicPresetNames.prettier,
  compile: ({ options }) => ({
    plugins: ['prettier'],

    rules: {
      'prettier/prettier': options ? ['error', options] : 'error'
    }
  })
})
