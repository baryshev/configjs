var
	config = require('./../index');

/* Init */

config.root = __dirname + '/config';
config.env = 'dev';

/* /Init */


/* Usage */

var appConfig = config.load('app');
console.log(appConfig.version);

/* /Usage */