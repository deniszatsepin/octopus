var rester = require('oct-utils/lib/rester');
var handlers = require('./rest')

module.exports = function() {
	console.log('oct-photo initialization...');
	rester('/upload', handlers);
};