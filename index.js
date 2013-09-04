var config = require('./config')
  , Configurator = require('oct-config');
  
Configurator.init(config);

var auth = require('oct-auth')
  , express = require('express');

auth.hello();
