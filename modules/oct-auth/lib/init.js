/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

var passport = require('passport')
  , server = require('oct-utils/lib/server').server
  , rester = require('oct-utils/lib/rester')
  , serializer = require('./serializer');

console.log("oct-auth initialization...");

module.exports = function() {
  require('./model');
 
  //Initializing passport
  server.use(passport.initialize());
  server.use(passport.session());

  passport.serializeUser(serializer.serialize);

  passport.deserializeUser(serializer.deserialize);

  loadStrategies();

};

var loadStrategies = function () {
  var local = require('./strategies/local');
  passport.use(local.strategy);
  rester('/session', local.routes);
};