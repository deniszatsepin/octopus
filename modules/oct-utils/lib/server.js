var express = require('express')
  , config = require('oct-config')
  , app = null;

module.exports.setup = function() {
  app = express();
  
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.get('server.secret')
  }));

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
