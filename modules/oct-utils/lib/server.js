var express = require('express');
var favicon = require('static-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var serveStatic = require('serve-static');
var errorHandler = require('errorhandler');
var config = require('oct-config');
var redis = require('./redis');
var RedisStore = require('connect-redis')(session);
var app = null;

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

    app.use(favicon(config.root + '/public/favicon.ico'));
    app.use(bodyParser({ uploadDir: config.root + '/uploads' }));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session(sessionOptions));

    module.exports.server = app;
    return app;
};

module.exports.postInstall = function () {
    app.use(serveStatic(config.root + '/public'));

    app.use( function(req, res, next) {
        res.send(404, "Sorry, but page with url " + req.url + " doesn't exist.");
    });

    var env = process.env.NODE_ENV || 'development';
    if ('development' === env) {
        app.use(errorHandler({
            showStack: true,
            dumpExceptions: true
        }));
    }
};
