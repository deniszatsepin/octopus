const _       = require('lodash');
const fs      = require('fs');
const	path    = require('path');
const	async   = require('async');
const	config  = require('oct-config');
const logger  = config.logger;
const	server  = require('./server').server;

/**
 *  @param {String} path to modules dirs
 *  @exclude {Array} names of excluded modules
 *  @callback {Function} callback function
 *  @callback.err {Error} if something goes wrong
 *  @callback.modules {Array} returns array of module's objects which were sorted by priority
 */
var getSortedModules = function(root, exclude, callback) {
	var cb = null, excl = [];

	if (typeof exclude === 'function') {
		cb = exclude;
		excl = [];
	} else {
		cb = callback;
		excl = exclude;
	}


	fs.exists(root, function (exists) {
		if (!exists) {
			callback(new Error('Path doesn\'t exists'));
		} else {
			fs.readdir(root, function(err, files) {
				if(err) {
					callback(err);
				} else {
					var modules = [];
					var getPackage = function(module, cb) {
						if (_.indexOf(excl, module) !== -1) {
							cb();
							return 0;
						}

						var modulePath = root + '/' + module;
						var packagePath = path.normalize(modulePath + '/package.json');
						fs.exists(packagePath, function(pkgExists) {
							if(pkgExists) {
								logger.info('Find module: ' + module);
								logger.info('Module path: ' + modulePath);
								var priority = require(modulePath + '/package').priority;
								var initPath = modulePath + '/lib/init.js';

								logger.info('Module priority: ' + priority);

								fs.exists(initPath, function(initExists) {
									if(initExists) {
										modules.push({
											name: module,
											init: modulePath + '/lib/init',
											priority: parseInt(priority, 10) || 1000
										});
									}
									cb();
								});

							} else {
								cb();
							}
						});

					};

					async.each(files, getPackage, function(err) {
						if (err) {
							cb(err);
						} else {

							modules.sort( function(a, b) {
								var ap = a.priority;
								var bp = b.priority;
								return ap === bp ? 0 : ap > bp ? 1 : -1;
							});

							cb(null, modules);
						}
					});

				}
			});
		}
	});
};

var initModules = function (modules, callback) {
	logger.debug('Modules: ', modules);
	_.each(modules, function(module) {
		var moduleInit = require(module.init);
		if (typeof moduleInit === 'function') {
			moduleInit();
		}
	});
	callback();
};

module.exports.initModules = function(callback) {
	var root = config.modPath;
	var excludeModules = ['oct-config'];

	getSortedModules(root, excludeModules, function(err, modules) {
		if(err) {
			callback(err);
		} else {
			initModules(modules, callback);
		}
	});

};
