const _ 				= require('lodash');
const util      = require('util');
const logger    = require('oct-core').logger;
const mongoose  = require('mongoose');

var User = mongoose.model('User');

var createUser = function *createUser(next) {

	this.checkBody('email').notEmpty('Email field is required').isEmail('You enter a bad email.');
	this.checkBody('password').notEmpty().len(3,20);

	if (this.errors) {
		this.body = this.errors;
		this.response.status = 401;
		return;
	}

	var user = new User({
		email: this.request.body.email,
		password: this.request.body.password
	});

	try {
		user = yield user.saveAsync();
	} catch(e) {
		if (e.name === 'ValidationError') {
			this.body = {
				errors: _.reduce(e.errors, function(res, val, key) {
					if (val && val.message) {
						res[key] = val.message;
					}
					return res;
				}, {})
			}
			return;
		} else {
			throw e;
		}
	}

	this.body = {
		data: {
			_id: user[0]._id,
			email: user[0].email
		}
	};
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