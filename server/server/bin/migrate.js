'use strict';

var path = require('path');

var server = require(path.resolve(__dirname, '../server'));
var my = server.dataSources.mysql;

var lbTables = ['request_key'];

my.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ' + my.adapter.name);
  my.disconnect();
  process.exit(0);
});
