import { PresetName } from './types'

export const PRIORITY: PresetName[] = [
  // should be applied first
  'base',
  'imports',
  'typescript',

  'prettier',
  'node',
  'react',
  'solid.js',

  // apply after react preset
  'next.js',

  // should be applied last
  'extend'
]
