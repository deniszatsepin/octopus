var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');
/**
 * Gets User object and returns User.id
 * @param {Object} user User object
 * @param {Function} done Callback function
 * @param {Error} done.error   Not null, if there was some sort of an error
 * @param {Number} done.userId   If User parameter is not null, then the function returns User.id.
 */

exports.serialize = function(user, done) {
	if(user) {
		done(null, user.id);
	} else {
		done(null, null);
	}
};

exports.deserialize = function(id, done) {
  //TODO: Find User in database by id and return him with done callback
	User.findOne({
		id: id
	}).exec(function(err, user) {
		if (err) {
			return done(err);
		}

		if (user.id === id) {
			return done(null, user);
		}
		done(null, null);
	});

};