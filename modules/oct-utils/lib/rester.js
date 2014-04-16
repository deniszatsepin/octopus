/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

var server = require('./server').server;
var express = require('express');

/**
 * This function gets handlers and base path and assosiate handlers with routes.
 * @param {String} path
 * @param {Array} handlers
 */
module.exports = function(handlers) {
	var path = '/';
	var router = express.Router();
  for (var actionName in handlers) {
    var handler = handlers[actionName]
      , route = '';

    switch(actionName) {
      case 'index':
        router.get(path, handler);
        break;
      case 'new':
        route = path + 'new';
        router.get(route, handler);
        break;
      case 'create':
        router.post(path, handler);
        break;
      case 'show':
        route = path + ':id';
        router.get(route, handler);
        break;
      case 'edit':
        route = path + ':id/edit';
        router.get(rotue, handler);
        break;
      case 'update':
        route = path + ':id';
        router.put(route, handler);
        break;
      case 'destroy':
        route = path + ':id';
        router.delete(route, handler);
        break;
      default:
        router.get(route, handler);
    }
  }
	return router;
};
