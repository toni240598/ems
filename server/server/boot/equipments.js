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
        url: `${host}/discobjects/equipmenttype/`,
        headers: {
          accepts: 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {create: ['data']},
      template: {
        method: 'POST',
        url: `${host}/discobjects/equipmenttype/`,
        body: '{data:object}',
      },
    },
    {
      functions: {remove: ['id']},
      template: {
        method: 'DELETE',
        url: `${host}/discobjects/equipmenttype/{id}`,
        headers: {
          accepts: 'application/json',
          'content-type': 'application/json',
        },
      },
    },
  ],
});

module.exports = (server) => {
  let router = server.loopback.Router();

  router.get('/api/equipmenttype', (req, res)=>{
    ds.find().then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.post('/api/equipmenttype', (req, res)=>{
    ds.create(req.body).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.delete('/api/equipmenttype/:id', (req, res)=>{
    ds.remove(req.params.id).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  server.use(router);
};
