var _ = require('lodash')
  , fs = require('fs')
  , path = require('path')
  , config = require('oct-config')
  , server = require('./server').server;


module.exports.initModules = function() {
  var root = config.modPath;

  var modules = fs.readdirSync();

  modules.forEach(function(module) {
    var modulePath = root + '/' + module;
    require(modulePath + '/lib/init');
  });

}
