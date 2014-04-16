var server = require('oct-utils/lib/server').server;
var rester = require('oct-utils/lib/rester');

var index = function (req, res, next) {
	var session = req.session;
	session.extra = {
		name: 'fetch',
		age: 35
	};
	console.log('session: ', session);
	res.send(200, 'Hello: ' + session);
};

var handlers = {
	index: index
};

var router = rester(handlers);
server.use('/hello', router);