import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../types'
import { createPreset } from '../shared'

export const solidJS = createPreset({
  name: publicPresetNames.solidJS,
  compile: ({ meta }) => ({
    env: { browser: true },

    parserOptions: {
      babelOptions: { presets: ['solid'] }, // ?
      ecmaFeatures: { jsx: true }
    },

    plugins: ['solid'],
    extends: [
      'plugin:solid/recommended',
      ...conditional.extends(meta.presets.has(publicPresetNames.typescript), ['plugin:solid/typescript'])
    ]
  })
})
