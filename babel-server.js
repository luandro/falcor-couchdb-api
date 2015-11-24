/**
 * Babel transpiler, api entry point
 */
require("babel-core/register")({
	presets: ["es2015"]
});

module.exports = require('./server');
