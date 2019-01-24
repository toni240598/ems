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
      functions: {alarms: []},
      template: {
        method: 'GET',
        url: `${host}/alarm/`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {alarm: ['latitude', 'longitude']},
      template: {
        method: 'GET',
        url: `${host}/alarm/{latitude}/{longitude}/`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {history: ['startTime', 'endTime', 'latitude', 'longitude']},
      template: {
        method: 'GET',
        url: `${host}/alarm/log/{startTime}/{endTime}/{latitude}/{longitude}/`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {acknowledge: ['id', 'username']},
      template: {
        method: 'POST',
        url: `${host}/alarm/acknowledge/{id}/{username}/`,
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

  router.get('/api/alarms', (req, res)=>{
    ds.alarms().then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.get('/api/alarms/:latitude/:longitude/', (req, res)=>{
    ds.alarm(req.params.latitude, req.params.longitude)
    .then(result=>res.send(result)).catch(err=>res.status(500).send(err));
  });

  router.get('/api/alarms/log/:startTime/:endTime/:latitude/:longitude/',
    (req, res)=>{
      ds.history(
            req.params.startTime,
            req.params.endTime,
            req.params.latitude,
            req.params.longitude
        ).then(result=>res.send(result))
        .catch(err=>res.status(500).send(err));
    });

  router.post('/api/alarms/acknowledge/:id/:username', (req, res)=>{
    ds.acknowledge(req.params.id, req.params.username)
    .then(result=>res.send(result)).catch(err=>res.status(500).send(err));
  });

  server.use(router);
};
