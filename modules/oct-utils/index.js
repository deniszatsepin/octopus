var Server = require('./lib/server')
  , http = require('http')
  , socketio = require('socket.io')
  , redis = require('./lib/redis')
  , mongo = require('./lib/mongo')
  , config = require('oct-config')
  ,	modules = require('./lib/modules');

module.exports.systemInit = function() {
  redis.init();
  mongo.init();

  var server = Server.setup();
  var port = config.get('server.port');
  var httpServer = http.createServer(server);
  var io = Server.io = socketio(httpServer);

  //TODO: initialize all modules
  modules.initModules(function (err) {
    Server.postInstall();
    httpServer.listen(port, function() {
      console.log('Octopus listening on port ' + port);
    });
  });
  
  

};
