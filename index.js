var config = require('./config')
  , Configurator = require('oct-config');
  
Configurator.init(config);

var utils = require('oct-utils');

utils.systemInit();
