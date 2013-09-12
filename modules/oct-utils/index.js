var Server = require('./lib/server')
  , http = require('http')
  , config = require('oct-config')
  ,	modules = require('./lib/modules');

module.exports.systemInit = function() {

  var server = Server.setup()
    , port = config.get('server.port');

  //TODO: initialize all modules
  modules.initModules();
  
  Server.postInstall();


  http.createServer(server).listen(port, function() {
    console.log('Octopus listening on port ' + port);
  });

};
