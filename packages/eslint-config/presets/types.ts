export const servicePresetNames = {
  base: 'base',
  extend: 'extend'
} as const

export const publicPresetNames = {
  imports: 'imports',
  node: 'node',
  astro: 'astro',
  prettier: 'prettier',
  typescript: 'typescript',
  react: 'react',
  solidJS: 'solid.js',
  nextJS: 'next.js'
} as const

export type ServicePresetName = (typeof servicePresetNames)[keyof typeof servicePresetNames]
export type PublicPresetName = (typeof publicPresetNames)[keyof typeof publicPresetNames]
export type PresetName = ServicePresetName | PublicPresetName
