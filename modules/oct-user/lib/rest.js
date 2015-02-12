const util      = require('util');
const logger    = require('oct-core').logger;

var createUser = function *createUser(next) {

	this.checkBody('email').notEmpty('Email field is required').isEmail('You enter a bad email.');
	this.checkBody('password').notEmpty().len(3,20);

	if (this.errors) {
		this.body = this.errors;
		this.response.status = 401;
		return;
	}
	this.body = ok;
};

var destroyUser = function *destroyUser(next) {
	this.body = {
		error: 0,
		message: 'session destroyed'
	};
};

module.exports.handlers = {
  create: createUser,
  destroy: destroyUser
};