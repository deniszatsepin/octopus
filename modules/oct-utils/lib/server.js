var express = require('express')
  , config = require('oct-config')
  , redis = require('./redis')
  , RedisStore = require('connect-redis')(express)
  , app = null;

module.exports.setup = function() {
  app = express();

  var sessionOptions = {
    secret: config.get('server.secret'),
    key: config.get('server.session.key'),
    cookie: {
      maxAge: config.get('server.session.maxAge') * 3600000,
      secure: config.get('server.session.secure')
    },
    store: new RedisStore({client: redis.client})
  };
  
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session(sessionOptions));
  console.log('setup');

  module.exports.server = app;
  return app;
};

module.exports.postInstall = function () {
  
  app.use(app.router);
  
  app.use( function(req, res, next) {
    res.send(404, "Sorry, but page with url " + req.url + " doesn't exist.");
  });

  app.configure('development', function () {
    app.use(express.errorHandler({
      showStack: true,
      dumpExceptions: true
    }));
  });

};
