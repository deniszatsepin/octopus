const config        = require('./config');
const Configurator  = require('oct-config');

config.root = __dirname;
Configurator.init(config);

var core = require('oct-core');

core.systemInit(true);

