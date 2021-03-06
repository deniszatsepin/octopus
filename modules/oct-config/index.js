const _       = require('lodash');
const path    = require('path');
const logger  = require('log4js').getLogger();

var Configurator = function(config) {
  this.config   = config;
  this.root     = config.root;
  this.modPath  = path.normalize(this.root + '/modules');
};

Configurator.prototype.get = function(path, quiet) {
  var elements = path.split('.');
  var result = this.config;
  for (var i = 0, len = elements.length; i < len; i += 1) {
    if (result[elements[i]] !== undefined) {
      result = result[elements[i]];
    } else {
      var desc = 'Configurator: wrong path (' + path + ')';
	    if (!quiet) {
		    logger.warn(desc);
	    }
	    return undefined;
    }
  }
  return result;
};

Configurator.prototype.set = function(path, val) {
	debugger;
  var elements = path.split('.');
	var key = elements.slice(0, -1).join('.');
	var element = this.get(key, true);
	if (element) {
		if (typeof element === 'object' || typeof element === 'undefined') {
			element[elements[elements.length - 1]] = val;
		} else {
			throw new Error('Configuration: wrong path (' + path + '), element ' + key + ' is not an object.');
		}
	} else {
		var path = this.config;
		_.each(elements.slice(0, -1), function(el) {
			"use strict";
			if (typeof path[el] === 'undefined') {
				path[el] = {};
			}
			if (typeof path[el] !== 'object') {
				throw new Error('Configuration: wrong path (' + path + '), element ' + el + ' is not an object.');
			}
			path = path[el];
		});
		path[elements[elements.length - 1]] = val;
	}
};

module.exports.init = function(config) {
  var configurator = module.exports = new Configurator(config);
  return configurator;
};
