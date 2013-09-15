var mongoose = require('mongoose');

var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

var authFields = {
  usernameField: 'email',
  passwordField: 'password'
};

var localStrategy = function(email, password, done) {
  //TODO: Find user by email and password and call done callback with success or error result.
  User.findOne({
		email: email
  }, function(err, user) {
		console.log('FindOne: ', err, user);
		if (err) {
			done(err);
			return null;
		}

		if (!user) {
			done(null, false, {
				message: 'Unknown user'
			});
			return null;
		}
		if (!user.authenticate(password)) {
			done(null, false, {
				message: 'Invalid password'
			});
			return null;
		}
		
		done(null, user);
  });
};

module.exports.strategy = new LocalStrategy(authFields, localStrategy);