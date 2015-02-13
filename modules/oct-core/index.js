const mongo   = require('./lib/mongo');
const redis   = require('./lib/redis');
const Server  = require('./lib/server');
const http    = require('http');
const config  = require('oct-config');
const modules = require('./lib/modules');
const log4js  = require('log4js');

module.exports.systemInit = function(initOnly) {
  redis.init();
  mongo.init();

  var logger   = log4js.getLogger();

  var server = Server.setup();
  var port = config.get('server.port');

  exports.server = server;
  exports.logger = logger;
  exports.rester = require('./lib/rester');

  //initialize all modules
  modules.initModulesSync();

  Server.postInstall();

  if (!initOnly) {
    var srv = http.Server(server.callback());
    var io = require('socket.io')(srv);
    srv.listen(port, function() {
      logger.info('Octopus listening on port ' + port);
    });
  }
};
