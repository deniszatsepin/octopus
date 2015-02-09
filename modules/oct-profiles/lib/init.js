const mount       = require('koa-mount');
const server      = require('oct-utils/lib/server').server;
const rester      = require('oct-utils/lib/rester');
const config      = require('oct-config');

require('./model');
const middleware  = require('./middleware');
const logger      = config.logger;

logger.info('oct-profiles initialization...');

module.exports = function() {
	"use strict";
	server.use(middleware());
};

