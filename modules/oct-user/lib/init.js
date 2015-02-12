/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

const mount     = require('koa-mount');
const config    = require('oct-config');
const core      = require('oct-core');
const server    = core.server;
const rester    = core.rester;
const logger    = core.logger;
const rest      = require('./rest');
require('./model');

logger.info("oct-user initialization...");

module.exports = function() {
	var router = rester(rest.handlers);
	server.use(mount('/user', router.middleware()));
};
