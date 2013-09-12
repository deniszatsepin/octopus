var _ = require('lodash')
  , path = require('path');

var Configurator = function(config) {
  this.config = config;
  this.root = path.normalize(__dirname + '/../..');
  this.modPath = path.normalize(this.root + '/modules');
};

Configurator.prototype.get = function(path) {
  var elements = path.split('.');
  var result = this.config;
  for (var i = 0, len = elements.length; i < len; i += 1) {
    if (typeof result[elements[i]] !== 'undefined') {
      result = result[elements[i]];
    } else {
      result = null;
      throw new Exception( 'Configurator: wrong path (' + path + ')' );
    }
  }
  return result;
};

//TODO: finish this function
Configurator.prototype.set = function(path, val) {
  var elements = path.split('.');

};

module.exports.init = function(config) {
  var configurator = module.exports = new Configurator(config);
  return configurator;
};
