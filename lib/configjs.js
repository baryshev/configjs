var
	path = require('path');

var root = '';
var env = 'all';
var allEnv = 'all';

var config = {};

module.exports.configure = function(options) {
	root = options.root || root;
	env = options.env || env;
};

module.exports.load = function(name) {
	if (!config[env]) config[env] = {};
	if (!config[env][name]) {
		config[env][name] = {};
		var envConfig = {};
		var allConfig = {};
		var configPath;
		configPath = path.normalize(root + '/' + env + '/' + name);
		try {
			envConfig = require(configPath);
		} catch (e) {}
		if (allEnv != env) {
			configPath = path.normalize(root + '/' + allEnv + '/' + name);
			try {
				allConfig = require(configPath);
			} catch (e) {}
		}
		var field;
		for (field in allConfig) {
			config[env][name][field] = allConfig[field];
		}
		field = undefined;
		for (field in envConfig) {
			config[env][name][field] = envConfig[field];
		}
		field = undefined;
	}
	return config[env][name];
};