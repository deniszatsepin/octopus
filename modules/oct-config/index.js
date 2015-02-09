const _       = require('lodash');
const path    = require('path');

var Configurator = function(config) {
  this.config   = config;
  this.root     = config.root;
  this.modPath  = path.normalize(this.root + '/modules');
};

Configurator.prototype.get = function(path) {
  var elements = path.split('.');
  var result = this.config;
  for (var i = 0, len = elements.length; i < len; i += 1) {
    if (result[elements[i]] !== undefined) {
      result = result[elements[i]];
    } else {
      result = null;
      var desc = 'Configurator: wrong path (' + path + ')';
      var err = new Error(desc);
	    this.logger.error(desc);
      throw err;
    }
  }
  return result;
};

Configurator.prototype.set = function(path, val) {
  var elements = path.split('.');
	var key = elements.slice(0, -1).join('.');
	var element = this.get(key);
	if (element) {
		element[elements[elements.length - 1]] = val;
	}
};

module.exports.init = function(config) {
  var configurator = module.exports = new Configurator(config);
  return configurator;
};
