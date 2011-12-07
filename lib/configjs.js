var
	path = require('path');

var
	options = {
		root : '',
		env : 'all',
		baseEnv : 'all'
	},
	config = {};

module.exports.configure = function(newOptions) {
	for (var option in options) {
		options[option] = newOptions[option] || options[option];
	}
};

module.exports.load = function(name) {
	if (!config[options.env]) config[options.env] = {};
	if (!config[options.env][name]) {
		config[options.env][name] = {};
		var baseConfig = {},
			envConfig = {},
			configPath,
			field;

		configPath = path.normalize(options.root + '/' + options.baseEnv + '/' + name);
		try {
			baseConfig = require(configPath);
		} catch (e) {}
		if (options.baseEnv != options.env) {
			configPath = path.normalize(options.root + '/' + options.env + '/' + name);
			try {
				envConfig = require(configPath);
			} catch (e) {}
		}
		for (field in baseConfig) {
			config[options.env][name][field] = baseConfig[field];
		}
		field = undefined;
		for (field in envConfig) {
			config[options.env][name][field] = envConfig[field];
		}
		field = undefined;
	}
	return config[options.env][name];
};