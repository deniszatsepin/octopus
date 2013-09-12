/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

var server = require('./server').server;

/**
 * This function gets handlers and base path and assosiate handlers with routes.
 * @param {String} path
 * @param {Array} handlers
 */
module.exports = function(path, handlers) {

  for (var actionName in handlers) {
    var handler = handlers[actionName]
      , route = '';

    switch(actionName) {
      case 'index':
        server.get(path, handler);
        break;
      case 'new':
        route = path + '/new';
        server.get(route, handler);
        break;
      case 'create':
        server.post(path, handler);
        break;
      case 'show':
        route = path + '/:id';
        server.get(route, handler);
        break;
      case 'edit':
        route = path + '/:id/edit';
        server.get(rotue, handler);
        break;
      case 'update':
        route = path + '/:id';
        server.put(route, handler);
        break;
      case 'destroy':
        route = path + '/:id';
        server.delete(route, handler);
        break;
      default:
        server.get(route, handler);
    }
  }
};
