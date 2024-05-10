import path from 'node:path'

import { Linter } from 'eslint'

import { compilePresets, Preset, presetExtend, presets, PRIORITY } from './presets'
import { applyMode, mergeConfigs, Mode } from './shared/lib/eslint'
import { applyModuleResolutionPatch } from './patch'
import { base } from './presets/base'

const ESLintKitOptionsSymbol = Symbol('ESLintKitOptions')
interface ExtendedLinterConfig<T extends Linter.RulesRecord = Linter.RulesRecord> extends Linter.Config<T> {
	[ESLintKitOptionsSymbol]: FinalOptions
}

interface Options {
	extends?: string | ExtendedLinterConfig
	root?: string
	mode?: Mode
	allowDebug?: boolean
	presets?: Preset[]
	extend?: Linter.Config
}

interface FinalOptions {
	extends?: Options['extends']
	root: Required<Options>['root']
	mode: Required<Options>['mode']
	allowDebug?: boolean
	presets: Required<Options>['presets']
	extend: Required<Options>['extend']
}

const finalizeOptions = (options: Options): FinalOptions => {
	const ownFinalOptions: FinalOptions = {
		...options,
		root: options.root ?? process.cwd(),
		mode: options.mode ?? 'default',
		presets: options.presets ?? [],
		extend: options.extend ?? {}
	}

	if (options.extends) {
		let extendedOptions: FinalOptions

		if (typeof options.extends === 'string') {
			const config = require(path.resolve(ownFinalOptions.root, options.extends))

			if (!config) {
				throw new Error(`Cannot find config ${options.extends}`)
			}

			if (!config[ESLintKitOptionsSymbol]) {
				throw new Error(`The config ${options.extends} is not produced by ESLint Kit`)
			}

			extendedOptions = config[ESLintKitOptionsSymbol]
		} else {
			if (!Boolean(options.extends[ESLintKitOptionsSymbol])) {
				throw new Error(`The config specified in "extends" is not produced by ESLint Kit`)
			}

			extendedOptions = options.extends[ESLintKitOptionsSymbol]
		}

		return {
			root: ownFinalOptions.root || extendedOptions.root,
			mode: 'mode' in ownFinalOptions ? ownFinalOptions.mode : extendedOptions.mode,
			allowDebug:
				'allowDebug' in ownFinalOptions ? ownFinalOptions.allowDebug : Boolean(extendedOptions.allowDebug),
			presets: extendedOptions.presets.concat(ownFinalOptions.presets),
			extend: {
				...extendedOptions.extend,
				...ownFinalOptions.extend,
				rules: {
					...extendedOptions.extend.rules,
					...ownFinalOptions.extend.rules
				},
				env: {
					...extendedOptions.extend.env,
					...ownFinalOptions.extend.env
				},
				globals: {
					...extendedOptions.extend.globals,
					...ownFinalOptions.extend.globals
				},
				plugins: [...(extendedOptions.extend.plugins || []), ...(ownFinalOptions.extend.plugins || [])],
				settings: {
					...extendedOptions.extend.settings,
					...ownFinalOptions.extend.settings
				},
				overrides: [...(extendedOptions.extend.overrides || []), ...(ownFinalOptions.extend.overrides || [])]
			}
		}
	}

	return ownFinalOptions
}

export const configure = (options: Options) => {
	const finalOptions = finalizeOptions(options)
	const { root, mode, allowDebug, presets, extend } = finalOptions

	let kitConfig = compilePresets(
		[base({ root, allowDebug: Boolean(allowDebug) }), ...presets, presetExtend(extend)],
		PRIORITY
	)

	// Apply mode only for included rules
	kitConfig = applyMode(kitConfig, mode)

	// Patch resolution only for included modules
	applyModuleResolutionPatch(kitConfig)

	const userConfig = compilePresets([presetExtend(extend)], PRIORITY)

	const config = mergeConfigs([kitConfig, userConfig]) as ExtendedLinterConfig
	config[ESLintKitOptionsSymbol] = finalOptions
	return config
}

export { presets }
