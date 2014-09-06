const mount   = require('koa-mount');
const server  = require('oct-utils/lib/server').server;
const rester  = require('oct-utils/lib/rester');

var index = function *helloPage (next) {
	var session = this.req.session;
	session.extra = {
		name: 'fetch',
		age: 35
	};
	console.log('session: ', session);
	this.status = 200;
	this.body = 'hello' + session;
};

var handlers = {
	index: index
};

var router = rester(handlers);
server.use(mount('/hello', router.middleware()));