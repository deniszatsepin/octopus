var _ = require('lodash');

var Configurator = function(config) {
  console.log('config: ', config);
  this.config = config;
}

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
}

Configurator.prototype.set = function(path, val) {
  var elements = path.split('.');

}

module.exports.init = function(config) {
  return module.exports = new Configurator(config);
};
