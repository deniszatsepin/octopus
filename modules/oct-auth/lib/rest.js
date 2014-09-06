const passport  = require('koa-passport');
const config    = require('oct-config');
const logger    = config.logger;
const util      = require('util');

var createSession = function *createSession(next) {
	var ctx = this;
	yield* passport.authenticate('local', function*(err, user, info) {
		logger.debug(util.format('Create session [User: %s, info: %s]'), user, info);

		var res = this.res;
		var req = this.req;
		if (err) throw err;

		if (!user) {
			logger.debug('Not user!');
			ctx.status = 401;
			ctx.body = {
				result: 'error',
				error: {
					nr: 1,
					description: 'authentication failure'
				}
			};
		} else {
			yield ctx.login(user);
			ctx.body = {
				result: 'ok',
				user_id: user._id
			};
		}

	}).call(this, next);
};

var destroySession = function *destroySession(next) {
	logger.debug('Destroy session');
	var sessId = this.body.id;
	this.status = 200;
	this.body = {
		error: 0,
		message: 'session destroyed'
	};
};

module.exports.handlers = {
  create: createSession,
  destroy: destroySession
};