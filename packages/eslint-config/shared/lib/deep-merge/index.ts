import type { Merge, PathsOf } from './types'

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

export enum Strategy {
  Shallow,
  Deep,
  Override
}

type AllPaths<A extends unknown, B extends unknown> = PathsOf<A> | PathsOf<B> | null

const shallowMerge = <A extends unknown, B extends unknown>(a: A, b: B): Merge<A, B> => {
  let merged

  if (Array.isArray(a) && Array.isArray(b)) {
    merged = [...a, ...b]
  } else if (isObject(a) && isObject(b)) {
    merged = { ...a, ...b }
  } else if (b !== undefined) {
    merged = b
  } else {
    merged = a
  }

  return merged as Merge<A, B>
}

export const deepMerge = <A extends unknown, B extends unknown>(
  a: A,
  b: B,
  strategy: (path: AllPaths<A, B>) => Strategy = () => {
    return Strategy.Deep
  },
  basePath: AllPaths<A, B> = null
) => {
  if (strategy(basePath) === Strategy.Shallow) {
    return shallowMerge(a, b)
  }

  if (strategy(basePath) === Strategy.Override) {
    return b
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return shallowMerge(a, b)
  }

  if (isObject(a) && isObject(b)) {
    const keys = [...Object.keys(a), ...Object.keys(b)]
    const final = {} as Record<string, unknown>

    for (const key of keys) {
      const path = basePath != null ? [basePath, key].join('.') : key
      // @ts-expect-error not able to find index signature
      final[key] = deepMerge(a[key], b[key], strategy, path)
    }

    return final as Merge<A, B>
  }

  return shallowMerge(a, b)
}
