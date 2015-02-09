/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

const passport  = require('koa-passport');
const mount     = require('koa-mount');
const server    = require('oct-core').server;
const rester    = require('oct-core').rester;
const rest      = require('./rest');
const config    = require('oct-config');
const logger    = require('log4js').getLogger();

logger.info("oct-auth initialization...");

module.exports = function() {
	require('./model');
	loadStrategies();
	var serializer = require('./serializer');
	passport.serializeUser(serializer.serialize);
	passport.deserializeUser(serializer.deserialize);
	//Initializing passport
	var router = rester(rest.handlers);
	server.use(passport.initialize());
	server.use(passport.session());
	server.use(mount('/session', router.middleware()));
};

var loadStrategies = function () {
	var local = require('./strategies/local');
	passport.use(local.strategy);
};