var passport = require("passport");

var createSession = function(req, res, next) {
	var authenticate = passport.authenticate('local', function(err, user, info) {
		console.log('Err: ', err);
		console.log('User: ', user);
		console.log('Info: ', info);
		console.log('Req: ', req);
		if (err) {
			next(err);
		}
		if (!user) {
			console.log('Not user!');
			res.json(400, {
				result: 'error',
				error: {
					nr: 1,
					description: 'authentication failure'
				}
			});
		} else {
			req.logIn(user, function(err) {
				if (err) {
					next(err);
				}
				res.json({
					result: 'ok',
					user_id: user._id
				});
			});
		}

	});
	authenticate(req, res, next);
};

var destroySession = function (req, res, next) {
	console.log('destroy session');
	var sessId = req.body.id;
	
	res.json(200, {
		error: 0,
		message: 'session destroyed'
	});
};

module.exports.handlers = {
  create: createSession,
  destroy: destroySession
};