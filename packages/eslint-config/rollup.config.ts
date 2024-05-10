// @ts-expect-error
import bundleSize from 'rollup-plugin-bundle-size'
import { defineConfig, type RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const dist = (file: string): string => {
	return `dist/${file}`
}

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

export default defineConfig([
	bundle('index.ts', {
		plugins: [esbuild()],
		output: [
			{ file: dist('index.js'), format: 'cjs' },
			{ file: dist('index.mjs'), format: 'es' }
		]
	}),
	bundle('index.ts', {
		plugins: [dts()],
		output: [{ file: dist('index.d.ts'), format: 'es' }]
	})
])
