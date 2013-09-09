var Server = require('./lib/server')
  , http = require('http')
  , config = require('oct-config');

module.exports.systemInit = function() {

  var server = Server.setup()
    , port = config.get('server.port');

  //TODO: initialize all modules

  
  Server.postInstall();


  http.createServer(server).listen(port, function() {
    console.log('Octopus listening on port ' + port);
  });

}
