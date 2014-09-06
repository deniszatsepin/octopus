/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

const passport  = require('koa-passport');
const mount     = require('koa-mount');
const server    = require('oct-utils/lib/server').server;
const rester    = require('oct-utils/lib/rester');
const rest      = require('./rest');
const config    = require('oct-config');
const logger    = config.logger;

logger.info("oct-auth initialization...");

module.exports = function() {
	//Initializing passport
	server.use(passport.initialize());
	server.use(passport.session());

	require('./model');
	var serializer = require('./serializer');

	passport.serializeUser(serializer.serialize);

	passport.deserializeUser(serializer.deserialize);

	loadStrategies();

	var router = rester(rest.handlers);
	server.use(mount('/session', router.middleware()));
};

var loadStrategies = function () {
	var local = require('./strategies/local');
	passport.use(local.strategy);
};