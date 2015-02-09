const log4js = require('log4js');
const config = require('./config');
const Configurator = require('oct-config');

const logger = log4js.getLogger();

logger.info('Octopus initialization.');

config.root = __dirname;
Configurator.init(config);

var core = require('oct-core');

core.systemInit();
