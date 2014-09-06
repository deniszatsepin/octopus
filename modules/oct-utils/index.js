var Server = require('./lib/server')
  , http = require('http')
  , redis = require('./lib/redis')
  , mongo = require('./lib/mongo')
  , config = require('oct-config')
  ,	modules = require('./lib/modules');

module.exports.systemInit = function() {
  redis.init();
  mongo.init();

  var server = Server.setup()
    , port = config.get('server.port');

  //TODO: initialize all modules
  modules.initModules(function (err) {
    Server.postInstall();


    var srv = http.Server(server.callback());
	  var io = require('socket.io')(srv);
	  srv.listen(port, function() {
      console.log('Octopus listening on port ' + port);
    });
  });
  
  

};
