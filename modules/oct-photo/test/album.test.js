console.log('ENV: ', process.env);

var config = require('oct-config').init(require('../../../config'));
var should = require('chai').should();
var mongoose = require('mongoose');
var mongooseInit = require('oct-utils/lib/mongo');
var AlbumManager = require('oct-photo');

var albumOwnerId = mongoose.Types.ObjectId();
var testAlbum1 = {
	owner: albumOwnerId,
	name: 'TestAlbum1',
	description: 'Test1 album description'		
};
var testAlbum2 = {
	owner: albumOwnerId,
	name: 'TestAlbum2',
	description: 'Test2 album description'
};

describe('Album', function(){
	describe('AlbumManager', function(done){

		before(function(){
			mongooseInit.init();
			mongoose.connection.collections.albums.drop(done);
		});

		it('should create an album1', function(done) {
			AlbumManager.createAlbum(testAlbum1, function (err) {
				should.not.exist(err);
				done();
			});
		});

		it('album name should be unique', function(done) {
			AlbumManager.createAlbum(testAlbum1, function (err) {
				should.exist(err);
				done();
			});
		});

		it('should create an album2', function(done) {
			AlbumManager.createAlbum(testAlbum2, function (err) {
				should.not.exist(err);
				done();
			});
		});

	});	
});