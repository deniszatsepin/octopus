var server = require('oct-utils/lib/server').server;
var rester = require('oct-utils/lib/rester');
var handlers = require('./rest');

module.exports = function() {
	console.log('oct-game initialization...');
	var router = rester(handlers);
	server.use('/game', router);
};
