const { configure, presets } = require('@habbaz-dev/eslint-config')

module.exports = configure({
	presets: [presets.imports(), presets.typescript(), presets.prettier(), presets.node()]
})
