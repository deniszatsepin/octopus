var LocalStrategy = require('passport-local').Strategy;

var authFields = {
  usernameField: 'email',
  passwordField: 'password'
};

var localStrategy = function(email, password, done) {
  //TODO: Find user by email and password and call done callback with success or error result.

};

module.exports.strategy = new LocalStrategy(authFields, localStrategy);

/**
 * This rest-api call creates session by email (username) and password
 * @param req
 * @param res
 * @param next
 */
var createSession = function (req, res, next) {
	console.log('create session');
	res.json(200, {
		error: 0,
		message: 'session created'
	});
};

var destroySession = function (req, res, next) {
	console.log('destroy session');
	var sessId = req.body.id;
	
	res.json(200, {
		error: 0,
		message: 'session destroyed'
	});
};

module.exports.routes = {
  create: createSession,
  destroy: destroySession
};
