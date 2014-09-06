const _         = require('lodash');
const passport  = require('passport');
const config    = require('oct-config');

module.exports.hello = function() {
  console.log( _.range(10) );
  console.log( "database port: ", config.get("database.port") );
};
