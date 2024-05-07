import { EXTENSIONS } from '../../shared'
import { publicPresetNames } from '../types'
import { createPreset } from '../shared'
import { createAliasSettings } from './alias'
import { createExtensionsRule } from './lib'

export interface Options {
  sort?: {
    newline?: boolean
    groups?: string[][]
  }
  alias?: {
    root?: string
    paths?: Record<string, string>
    jsconfig?: string
  }
}

const DEFAULT_IMPORT_GROUPS: string[][] = [
  // side effects
  ['^\\u0000'],

  // node.js libraries and scoped libraries
  ['^(child_process|crypto|events|fs|http|https|os|path)(/.*)?$', '^@?\\w'],

  // common aliases (@app, @root, @/, ~/) and anything not matched
  ['^@app', '^@root', '^~', '^'],

  // relative imports
  ['^\\.']
]

export const imports = createPreset<Options>({
  name: publicPresetNames.imports,
  updateMeta: ({ meta }) => {
    meta.imports.extensions.push(...EXTENSIONS.MISC)
    meta.imports.extensions.push(...EXTENSIONS.JS)
  },
  compile: ({ options = {}, meta }) => {
    const { sort = {} } = options
    const { newline = false, groups = DEFAULT_IMPORT_GROUPS } = sort
    const finalGroups = newline ? groups : [groups.flat()]

    return {
      plugins: ['import', 'simple-import-sort'],
      settings: {
        'import/extensions': meta.imports.extensions,
        'import/core-modules': [],
        'import/ignore': ['\\.(scss|css|less|hbs|svg|json)$'],
        'import/internal-regex': '^@types/',
        ...createAliasSettings({ options, meta })
      },
      rules: {
        'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
        'import/no-default-export': 'warn',
        'import/no-anonymous-default-export': 'error',
        'import/export': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-amd': 'error',
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/extensions': createExtensionsRule(meta.imports.extensions),
        'import/newline-after-import': 'warn',
        'import/no-webpack-loader-syntax': 'error',
        'import/no-self-import': 'error',
        'import/no-absolute-path': 'error',
        'import/no-named-default': 'error',
        'import/no-empty-named-blocks': 'error',
        'import/no-cycle': 'off', // TODO: turn on when execution time became normal
        // 'import/no-cycle': ['error', { maxDepth: Number.POSITIVE_INFINITY }],
        'import/no-useless-path-segments': ['error', { commonjs: true, noUselessIndex: true }],
        'import/order': ['error', { groups: ['builtin', 'external', 'internal'], 'newlines-between': 'always' }],

        'simple-import-sort/imports': ['warn', { groups: finalGroups }],
        'simple-import-sort/exports': 'warn'
      }
    }
  }
})
