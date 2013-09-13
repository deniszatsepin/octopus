
/**
 * Gets User object and returns User.id
 * @param {Object} user User object
 * @param {Function} done Callback function
 * @param {Error} done.error   Not null, if there was some sort of an error
 * @param {Number} done.userId   If User parameter is not null, then the function returns User.id.
 */

exports.serialize = function(user, done) {
	console.log("Passport user: ", user);
	console.log("Passport done: ", done);
	if(user) {
		done(null, user.id);
	} else {
		done(null, null);
	}
};

exports.deserialize = function(id, done) {
  //TODO: Find User in database by id and return him with done callback

  //dummy finder
  var User = {
		id: 123,
		email: 'denis@zatsepin.spb.ru',
		password: 456
  };

  if (id === User.id) {
		done(null, User);
  } else {
		done(null, null);
  }
};