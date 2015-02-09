const koa         = require('koa');
const favicon     = require('koa-favi');
const bodyParser  = require('koa-bodyparser');
const jade        = require('koa-jade');
const session     = require('koa-sess');
const serveStatic = require('koa-static');
const onerror     = require('koa-onerror');
const config      = require('oct-config');
const redis       = require('./redis');
const redisStorage  = require('koa-redis');
const Router      = require('koa-router');
const jadeConfig  = require('')
var app = null;

module.exports.setup = function() {
  app = koa();
	onerror(app);

	app.keys = [config.get('server.session.key')];
	app.use(session({
		secret: config.get('server.secret'),
		cookie: {
			maxAge: config.get('server.session.maxAge') * 3600000,
			secure: config.get('server.session.secure')
		},
		store: redisStorage({client: redis.client})
	}));

	app.use(favicon(config.root + config.get('static.favicon')));
	app.use(bodyParser());
	app.use(Router(app));

  module.exports.server = app;
  return app;
};

module.exports.postInstall = function () {
  app.use(serveStatic(config.root + '/public'));

	/*
	var env = process.env.NODE_ENV || 'development';
  if ('development' === env) {
    app.use(errorHandler({
      showStack: true,
      dumpExceptions: true
    }));
  }
  */
};
