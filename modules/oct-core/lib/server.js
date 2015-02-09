const koa         = require('koa');
const bodyParser  = require('koa-bodyparser');
const onerror     = require('koa-onerror');
const config      = require('oct-config');
const redis       = require('./redis');
const redisStorage  = require('koa-redis');
const Router      = require('koa-router');
var app = null;

module.exports.setup = function() {
  app = koa();
	onerror(app);

	app.use(bodyParser());
	app.use(Router(app));

  return app;
};

module.exports.postInstall = function () {
};
