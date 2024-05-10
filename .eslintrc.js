const { configure, presets } = require('./packages/eslint-config/dist')

module.exports = configure({
	presets: [presets.imports(), presets.typescript(), presets.prettier(), presets.node()]
})
