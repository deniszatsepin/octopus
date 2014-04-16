/**
*	Redis utils
*
* denis@zatsepin.spb.ru
*/

var redis = require('redis');
var config = require('oct-config');


exports.init = function () {
	var port = config.get('redis.port');
	var host = config.get('redis.host');
	console.log('redis cfg: ', host, ':', port);

	var client = redis.createClient(port, host);
	
	client.on('error', function (err) {
		console.log('Error: ' + err);
  });
	
	module.exports.client = client;
};

