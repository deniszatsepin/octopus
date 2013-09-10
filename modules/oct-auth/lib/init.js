/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

var passport = require('passport')
  , server = require('oct-utils/lib/server').server;

console.log("oct-auth initialization...");
module.exports = function() {

  //Initializing passport
  server.use(passport.initialize());
  server.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log("Passport user: ", user);
    console.log("Passport done: ", done);
    if(user) {
      done(null, user.id);
    } else {
      done(null, null);
    }
  });

  passport.deserializeUser(function(id, done) {
    //TODO: Find User in database by id and return him with done callback
    /*
    User.findOne({
      _id: id
    }, function(err, user) {
      done(err, user);
    });
    */
  });

  loadStrategies();

}

var loadStrategies = function () {
  var local = require('./strategies/local');
  passport.use(local);
}