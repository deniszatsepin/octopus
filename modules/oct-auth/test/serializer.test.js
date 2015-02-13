var serializer = require('../lib/serializer')
  ,	should = require('chai').should();

describe('Authentication', function() {
  describe('Passport serializer', function () {

    it('should return write id by user', function() {
      var user = {id: 123};	
      var done = function (err, id) {
        should.not.exist(err);
        id.should.equal(123);
      };
      serializer.serialize(user, done);
    });	

    it('should return the user by id', function (done) {
      var id = 123;
      var ready = function (err, user) {
        should.not.exist(err);
        user.id.should.equal(123);
        done();
      };
      serializer.deserialize(id, ready);
    });

  });
});
