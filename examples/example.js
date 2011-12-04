var
	config = require('./../index');

/* Init */

config.configure({
	root : __dirname + '/config',
	env : 'dev'
});

/* /Init */


/* Usage */

var appConfig = config.load('app');
console.log(appConfig.name);

/* /Usage */