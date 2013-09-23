var mongoose = require('mongoose');
var mongoInit = require('oct-utils/lib/mongo');
var config = require('oct-config');
require('./lib/model');

var AlbumManager = function AlbumManager() {
	AlbumManager.prototype.init.apply(this, arguments);
};

AlbumManager.prototype.init = function (config) {
	this.photoPath = config.path;
};

AlbumManager.prototype.createAlbum = function (params, done) {
	var err;
	if (typeof params !== 'object') {
		
		err = new Error('Album params not specified.');
		
		done(err);
		return;
	}

	if (!params.name || params.name.length === 0) {
		err = new Error('Album name is not specified.');
		done(err);
		return;
	}

	var Album = mongoose.model('Album');
	var album = new Album({
		owner: params.owner,
		name: params.name,
		description: params.description,
	});

	album.save(function (err) {
		if (err) {
			done(err);
		} else {
			done();	
		}
	});
};

AlbumManager.prototype.removeAlbum = function (params, done) {

};

AlbumManager.prototype.addPhoto = function(album, file, done) {

};

AlbumManager.prototype.removePhoto = function(album, file, done) {

};

AlbumManager.prototype.getAlbums = function(user, done) {

};

AlbumManager.prototype.getAlbum = function(album, done) {

};

module.exports = new AlbumManager(config.get('photo.path'));