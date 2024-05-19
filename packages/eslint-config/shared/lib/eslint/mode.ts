import type { Linter } from 'eslint'

type Level = 'off' | 'warn' | 'error'

export type Mode = 'default' | 'only-errors' | 'only-warns' | 'disable-warns' | 'decrease-level'

type MapLevel = {
  [level in Level]: Level
}

const normalizeLevel = (raw: Linter.RuleLevel): Level => {
  switch (raw) {
    case 0:
      return 'off'
    case 1:
      return 'warn'
    case 2:
      return 'error'
    default:
      return raw
  }
}

const mappers: Record<Mode, MapLevel> = {
  default: {
    off: 'off',
    warn: 'warn',
    error: 'error'
  },
  'only-errors': {
    off: 'off',
    warn: 'error',
    error: 'error'
  },
  'only-warns': {
    off: 'off',
    warn: 'warn',
    error: 'warn'
  },
  'disable-warns': {
    off: 'off',
    warn: 'off',
    error: 'error'
  },
  'decrease-level': {
    off: 'off',
    warn: 'off',
    error: 'warn'
  }
}

const mapRuleEntry = (ruleEntry: Linter.RuleEntry, mapper: MapLevel): Linter.RuleEntry => {
  if (!Array.isArray(ruleEntry)) {
    const normalized = normalizeLevel(ruleEntry)
    return mapper[normalized]
  }

  const [level, ...rest] = ruleEntry
  const normalized = normalizeLevel(level)
  return [mapper[normalized], ...rest]
}

const mapRules = (
  mapper: MapLevel,
  rules: Partial<Linter.RulesRecord> | undefined = {}
): Partial<Linter.RulesRecord> => {
  return Object.fromEntries(
    Object.entries(rules).map(([ruleName, ruleEntry]) => {
      return [ruleName, ruleEntry ? mapRuleEntry(ruleEntry, mapper) : 'off']
    })
  )
}

export const applyMode = (config: Linter.Config, mode: Mode): Linter.Config => {
  const { rules = {}, overrides = [], ...rest } = config
  const mapper = mappers[mode]

  return {
    ...rest,
    rules: mapRules(mapper, rules),
    overrides: overrides.map((override) => {
      return {
        ...override,
        rules: mapRules(mapper, override.rules)
      }
    })
  }
}
