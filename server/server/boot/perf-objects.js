'use strict';
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
      functions: {find: []},
      template: {
        method: 'GET',
        url: `${host}/perfobjects`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {create: ['data']},
      template: {
        method: 'POST',
        url: `${host}/perfobjects`,
        body: '{data:object}',
      },
    },
    {
      functions: {delete: ['id']},
      template: {
        method: 'DELETE',
        url: `${host}/perfobjects/{id}`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    },
  ],
});

module.exports = (server) => {
  let router = server.loopback.Router();

  router.get('/api/perfobjects', (req, res)=>{
    ds.find().then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.post('/api/perfobjects', (req, res)=>{
    ds.create(req.body).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.delete('/api/perfobjects/:id', (req, res)=>{
    ds.delete(req.params.id).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  server.use(router);
};
