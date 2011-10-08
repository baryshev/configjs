var
	path = require('path');

module.exports.root = '';
module.exports.env = '';

module.exports.load = function(name) {
	return require(path.normalize(module.exports.root + '/' + module.exports.env + '/' + name));
};