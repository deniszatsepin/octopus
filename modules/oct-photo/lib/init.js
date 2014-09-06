var server = require('oct-utils/lib/server').server;
var rester = require('oct-utils/lib/rester');
var handlers = require('./rest');
const mount   = require('koa-mount');
const config  = require('oct-config');
const logger  = config.logger;

module.exports = function() {
	logger.info('Module oct-photo initialization...');
	var router = rester(handlers);
	server.use(mount('/upload', router.middleware()));
};