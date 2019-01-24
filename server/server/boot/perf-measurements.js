"use strict";
// var host    = 'http://access-satunol.ddns.net:3001';
// var host    = 'http://satunol-dev.ddns.net:3001';
var host = 'http://ems-satunol.ddns.net:3001';
// var host = 'http://localhost:3001';
// var host = 'http://167.99.72.78:3001';
var loopback = require('loopback');
var ds = loopback.createDataSource({
  connector: require('loopback-connector-rest'),
  debug: false,
  operations: [
    {
      functions: {find: ['id', 'start', 'end']},
      template: {
        method: 'GET',
        url: `${host}/perfmeasurements/{id}/{start}/{end}/`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    }
  ]
});

module.exports = (server) => {
  let router = server.loopback.Router();

  router.get('/api/perfmeasurements/:id/:start/:end/', (req, res) =>{
      const start = req.params.start + 'Z';
      const end = req.params.end + 'Z';
      ds.find(req.params.id, start, end)
      .then(result => res.send(result))
      .catch(err=>res.status(500).send(err));
  });

  server.use(router);
};
