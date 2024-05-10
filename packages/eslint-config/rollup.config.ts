// @ts-expect-error missing declaration types file (d.ts)
import bundleSize from 'rollup-plugin-bundle-size'
import { defineConfig, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import esbuild from 'rollup-plugin-esbuild'

const dist = (file: string): string => {
	return `dist/${file}`
}

// @ts-expect-error Property 'ROLLUP_WATCH' comes from an index signature, so it must be accessed with ['ROLLUP_WATCH'].ts(4111)
const isWatching = process.env.ROLLUP_WATCH === 'true'

const bundle = (input: string, config: RollupOptions): RollupOptions => {
	return defineConfig({
		...config,
		input,
		external: (id): boolean => {
			return !/^[./]/.test(id)
		},
		plugins: [...[config.plugins], bundleSize()]
	})
}

const rollupConfigs: RollupOptions[] = [
	bundle('index.ts', {
		plugins: [esbuild(), terser()],
		output: [
			{ file: dist('index.js'), format: 'cjs' },
			{ file: dist('index.mjs'), format: 'es' }
		]
	})
]

if (!isWatching) {
	rollupConfigs.push(
		bundle('index.ts', {
			plugins: [dts()],
			output: [{ file: dist('index.d.ts'), format: 'es' }]
		})
	)
}

export default defineConfig(rollupConfigs)
