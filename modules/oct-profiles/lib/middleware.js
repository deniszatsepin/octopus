/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>
 * on 07.09.14.
 */

const mongoose = require('mongoose');
const core = require('oct-core');
const logger = core.logger;
const Profile = mongoose.model('Profile');
//const thunkify = require('thunkify');

logger.info('oct-profiles initialization...');

function getProfile(req) {
	return function(fn) {
		Profile.findOne(req, fn);
	};
}

module.exports = function() {
	return function *profile(next) {
		if (this.isAuthenticated()) {
			var user = this.passport.user;
			var profile = yield getProfile({
				userId: user.id
			});
			user.profile = profile;
		}
		yield next;
	};
};