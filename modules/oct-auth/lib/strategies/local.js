var LocalStrategy = require('passport-local').Strategy
  , rester = require('oct-utils/lib/rester');

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

};

var destroySession = function (req, res, next) {

};

module.exports.routes = {
  create: createSession,
  destroy: destroySession
};
