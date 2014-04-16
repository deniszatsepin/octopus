var config    = require('oct-config');
var mongoose  = require('mongoose');
var path      = require('path');
var fixtures  = require('pow-mongoose-fixtures');


exports.init = function () {
	var host    = config.get('mongo.host');
	var port    = config.get('mongo.port');
	var dbName  = config.get('mongo.db');
	
	var url = 'mongodb://' + host + '/' + dbName;

	mongoose.connect(url);
	var db = mongoose.connection;

	db.on('error', function() {
		console.log('Mongoose connection error');
	});

	//Load fixtures
	db.once('open', function() {
		var fixPath = path.join(config.root, config.get('mongo.fixtures'));
		//fixtures.load(fixPath, mongoose);
	});

	exports.mongoose = mongoose;
};
