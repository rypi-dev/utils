import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../types'
import { createPreset } from '../shared'

export const nextJS = createPreset({
  name: publicPresetNames.nextJS,
  compile: ({ meta }) => ({
    extends: ['plugin:@next/next/recommended'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      ...conditional.rules(meta.presets.has(publicPresetNames.imports), {
        'import/no-default-export': 'off'
      })
    }
  })
})
