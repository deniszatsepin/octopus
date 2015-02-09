const mount   	= require('koa-mount');
const core 			= require('oct-core');
const handlers	= require('./rest');
const logger  	= core.logger;
const server 		= core.server;
const rester 		= core.rester;

module.exports = function() {
	logger.info('Module oct-photo initialization...');
	var router = rester(handlers);
	server.use(mount('/upload', router.middleware()));
};