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
