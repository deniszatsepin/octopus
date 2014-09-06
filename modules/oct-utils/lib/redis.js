/**
*	Redis utils
*
* denis@zatsepin.spb.ru
*/

const redis = require('redis');
const config = require('oct-config');
const logger = config.logger;


exports.init = function () {
	var port = config.get('redis.port');
	var host = config.get('redis.host');
	logger.debug('Redis config: ' + host + ':', port);

	var client = redis.createClient(port, host);
	
	client.on('error', function (err) {
		logger.error('Redis error: ' + err);
  });
	
	module.exports.client = client;
};

