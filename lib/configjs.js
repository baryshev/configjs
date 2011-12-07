var
	path = require('path');

var
	options = {
		root : '',
		env : 'all',
		allEnv : 'all'
	},
	config = {};

module.exports.configure = function(newOptions) {
	options.root = newOptions.root || options.root;
	options.env = newOptions.env || options.env;
};

module.exports.load = function(name) {
	if (!config[options.env]) config[options.env] = {};
	if (!config[options.env][name]) {
		config[options.env][name] = {};
		var envConfig = {};
		var allConfig = {};
		var configPath;
		configPath = path.normalize(options.root + '/' + options.env + '/' + name);
		try {
			envConfig = require(configPath);
		} catch (e) {}
		if (options.allEnv != options.env) {
			configPath = path.normalize(options.root + '/' + options.allEnv + '/' + name);
			try {
				allConfig = require(configPath);
			} catch (e) {}
		}
		var field;
		for (field in allConfig) {
			config[options.env][name][field] = allConfig[field];
		}
		field = undefined;
		for (field in envConfig) {
			config[options.env][name][field] = envConfig[field];
		}
		field = undefined;
	}
	return config[options.env][name];
};