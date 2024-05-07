import { publicPresetNames } from '../types'
import { createPreset } from '../shared'

export const node = createPreset({
  name: publicPresetNames.node,
  compile: () => ({
    env: { node: true }
  })
})
