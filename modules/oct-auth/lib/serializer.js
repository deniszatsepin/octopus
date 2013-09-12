
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