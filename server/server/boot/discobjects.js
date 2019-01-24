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
      functions: {findAll: []},
      template: {
        method: 'GET',
        url: `${host}/discobjects`,
        headers: {
          accepts: 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {findOne: ['id']},
      template: {
        method: 'GET',
        url: `${host}/discobjects/{id}/`,
        headers: {
          accepts: 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {find: ['latitude', 'longitude']},
      template: {
        method: 'GET',
        url: `${host}/discobjects/location/{latitude}/{longitude}/`,
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
        url: `${host}/discobjects`,
        body: '{data:object}',
      },
    },
    {
      functions: {update: ['id', 'data']},
      template: {
        method: 'PUT',
        url: `${host}/discobjects/{id}`,
        body: '{data:object}',
      },
    },
    {
      functions: {remove: ['id']},
      template: {
        method: 'DELETE',
        url: `${host}/discobjects/{id}`,
        headers: {
          accepts: 'application/json',
          'content-type': 'application/json',
        },
      },
    },
  ],
});

module.exports = (server) => {
  var router = server.loopback.Router();

  router.get('/api/discobjects', (req, res)=>{
    ds.findAll().then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.get('/api/discobjects/:id', (req, res)=>{
    ds.findOne(req.params.id).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.get('/api/discobjects/:latitude/:longitude/', (req, res)=>{
    ds.find(req.params.latitude, req.params.longitude).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.post('/api/discobjects', (req, res)=>{
    let value = req.body;
    ds.create(value).then(result=> res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.put('/api/discobjects/:id', (req, res)=>{
    ds.update(req.params.id, req.body).then(result=> res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.delete('/api/discobjects/:id', (req, res)=>{
    ds.remove(req.params.id).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  server.use(router);
};


//  insert into disc_object values (null, -6.883435, 107.609897, 'Gembok', 1, null);
