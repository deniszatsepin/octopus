var _ = require('lodash')
  , fs = require('fs')
  , path = require('path')
  , config = require('oct-config')
  , server = require('./server').server;


module.exports.initModules = function() {
  var root = config.modPath;

  var moduleDirs = fs.readdirSync(root);
  var modules = [];

  moduleDirs.forEach(function(module) {
    console.log('init module: ', module);
    if (module === 'oct-utils') return 0;

    var modulePath = root + '/' + module;
    var packagePath = path.normalize(modulePath + '/package.json');
    console.log(packagePath);
    if(fs.existsSync(packagePath)) {
      console.log('e');
      var priority = require(modulePath + '/package').priority;

      modules.push({
        name: module,
        init: modulePath + '/init',
        priority: parseInt(priority) || 1000
      });     
    }
  });

  modules.sort( function(a, b) {
    var ap = a.priority;
    var bp = b.priority;
    return ap === bp ? 0 : ap > bp ? 1 : -1; 
  });

  console.log('Modules: ', modules);
}
