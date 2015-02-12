const passport  = require('koa-passport');
const util      = require('util');
const logger    = require('oct-core').logger;

var createSession = function *createSession(next) {

	this.checkBody('email').notEmpty('Email field is required').isEmail('You enter a bad email.');
	this.checkBody('password').notEmpty().len(3,20);

	if (this.errors) {
		this.body = {
			errors: this.errors
		};
		this.response.status = 401;
		return;
	}

	var ctx = this;
	yield* passport.authenticate('local', function*(err, user, info) {
		var message = info ? info.message : '';
		logger.debug(util.format('Create session [User: %s, info: %s]'), user, message);

		var res = this.res;
		var req = this.req;
		if (err) throw err;

		if (!user) {
			logger.debug('Not user!');
			ctx.status = 401;
			ctx.body = {
				errors: {
					auth: 'email or password are incorrect'
				}
			};
		} else {
			yield ctx.login(user);
			ctx.body = {
				data: user
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