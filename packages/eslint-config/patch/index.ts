import Module from 'node:module'

import type { Linter } from 'eslint'

import { ModuleResolver } from './rushstack'

interface Resolved {
  name: string
  path: string
}

const getModuleNames = (config: Linter.Config) => {
  const { parser, plugins = [], parserOptions = {}, settings = {} } = config
  const additionalParser = parserOptions.parser
  const resolversSettings = settings['import/resolver'] || {}

  const moduleNames: string[] = []

  if (parser) {
    moduleNames.push(parser)
  }

  if (additionalParser) {
    moduleNames.push(additionalParser)
  }

  for (const plugin of plugins) {
    if (plugin.startsWith('@')) {
      moduleNames.push(`${plugin}/eslint-plugin`)
    } else {
      moduleNames.push(`eslint-plugin-${plugin}`)
    }
  }

  for (const resolver of Object.keys(resolversSettings)) {
    if (resolver.startsWith('eslint-import-resolver')) {
      moduleNames.push(resolver)
      continue
    }

    moduleNames.push(`eslint-import-resolver-${resolver}`)
  }

  return moduleNames
}

const patchRequire = (require: NodeRequire, resolved: Resolved[]) => {
  const originalResolve = require.resolve

  const resolve = function resolve(id: string, options: { paths?: string[] | undefined } | undefined) {
    for (const { name, path } of resolved) {
      if (id === name) {
        return path
      }
    }

    return originalResolve(id, options)
  }

  require.resolve = Object.assign(resolve, { paths: originalResolve.paths })
}

export const applyModuleResolutionPatch = (config: Linter.Config) => {
  const moduleNames = getModuleNames(config)

  const resolved: Resolved[] = moduleNames.map((name) => ({
    name,
    path: require.resolve(name, { paths: [__dirname] })
  }))

  const originalResolve = ModuleResolver.resolve

  ModuleResolver.resolve = (id, relativeTo) => {
    for (const { name, path } of resolved) {
      if (id === name) {
        return path
      }
    }

    return originalResolve(id, relativeTo)
  }

  patchRequire(require, resolved)

  const originalCreateRequire = Module.createRequire

  Module.createRequire = (path) => {
    const require = originalCreateRequire(path)
    patchRequire(require, resolved)
    return require
  }

  const ModuleRequire = require('eslint-module-utils/module-require')

  const originalModuleRequire = ModuleRequire.default

  ModuleRequire.default = (id: string) => {
    for (const { name, path } of resolved) {
      if (id === name) {
        return require(path)
      }
    }

    return originalModuleRequire(id)
  }
}
