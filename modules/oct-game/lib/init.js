var core 			= require('oct-core');
var server 		= core.server;
var rester 		= core.rester;
var handlers 	= require('./rest');

module.exports = function() {
	console.log('oct-game initialization...');
	var router = rester(handlers);
	//server.use('/game', router);
};
