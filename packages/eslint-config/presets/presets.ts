import { imports } from './imports'
import { publicPresetNames } from './types'
import { nextJS } from './nextjs'
import { node } from './node'
import { prettier } from './prettier'
import { react } from './react'
import { solidJS } from './solid'
import { typescript } from './typescript'
import { astro } from './astro'

export const presets: Record<keyof typeof publicPresetNames, CallableFunction> = {
  imports,
  node,
  astro,
  prettier,
  typescript,
  react,
  solidJS,
  nextJS
}
