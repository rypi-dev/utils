// @ts-expect-error
import bundleSize from 'rollup-plugin-bundle-size'
import { type RollupOptions, defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const dist = (file: string): string => `dist/${file}`

const bundle = (input: string, config: RollupOptions): RollupOptions =>
  defineConfig({
    ...config,
    input,
    external: (id): boolean => !/^[./]/.test(id),
    plugins: [...(config.plugins || []), bundleSize()]
  })

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
