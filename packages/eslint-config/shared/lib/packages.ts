import { parse } from 'semver'

import { PackageJson } from '../types'

const mergeDependencies = (packageJson: PackageJson) => {
  const { dependencies = {}, devDependencies = {} } = packageJson
  return { ...dependencies, ...devDependencies }
}

export const getPackageSemver = (name: string, packageJson: PackageJson) => {
  const allDependencies = mergeDependencies(packageJson)

  const version = allDependencies[name]
  if (!version) {
    return null
  }

  const parsed = parse(version)
  if (!parsed) {
    return null
  }

  return parsed
}
