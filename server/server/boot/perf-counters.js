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
        url: `${host}/perfcounters`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {find: ['latitude', 'longitude']},
      template: {
        method: 'GET',
        url: `${host}/perfcounters/{latitude}/{longitude}/`,
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
        url: `${host}/perfcounters`,
        body: '{data:object}',
      },
    },
    {
      functions: {remove: ['id']},
      template: {
        method: 'DELETE',
        url: `${host}/perfcounters/{id}`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    },
    {
      functions: {measurement: ['id', 'start', 'end']},
      template: {
        method: 'GET',
        url: `${host}/perfmeasurements/{id}/{start}/{end}/`,
        headers: {
          'accepts': 'application/json',
          'content-type': 'application/json',
        },
      },
    },
  ],
});

module.exports  = (server) => {
  let router = server.loopback.Router();
  router.get('/api/perfcounters', (req, res) => {
    ds.findAll()
      .then(result => res.send(result))
      .catch(error => res.status(500).send(error));
  });
  router.get('/api/perfcounters/:latitude/:longitude/', (req, res)=>{
    ds.find(req.params.latitude, req.params.longitude)
     .then(result=>res.send(result))
     .catch(err=>res.status(500).send(err));
  });

  router.post('/api/perfcounters', (req, res)=>{
    ds.create(req.body).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));
  });

  router.delete('/api/perfcounters/:id', (req, res)=>{
    ds.remove(req.params.id).then(result=>res.send(result))
    .catch(err=>res.status(500).send(err));;
  });

  function format(now, format) {
    let months = {Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'};
    now = new Date(now).toString();
    let config = {
      YYYY: now.substr(11, 4),
      MM: months[now.substr(4, 3)],
      DD: now.substr(8, 2),
      hh: now.substr(16, 2),
      mm: now.substr(19, 2),
      ss: now.substr(22, 2),
    };
      // format
    let myDate = '';
    myDate = format;
    for (var i in config) {
      myDate = myDate.split(i).join(config[i]);
    }
    return myDate;
  }

  function getDate(timeType) {
    var start = new Date();
    var end = new Date();
    var value = {start: 'T00:00:00Z', end: 'T23:59:59Z'};
    if (timeType !== 'MIN5') {
      if (timeType === 'HOUR1') {
        start.setDate(start.getDate() - 6);
      } else {
        start.setMonth(start.getMonth() - 2);
        start.setDate(1);
      }
    }
    start = format(start, 'YYYY-MM-DD');
    end   = format(end, 'YYYY-MM-DD');
    value.start = start + value.start;
    value.end   = end   + value.end;
    return value;
  }

  router.get('/api/perfmeasurements/:latitude/:longitude', (req, res)=>{
    const latitude  = req.params.latitude;
    const longitude = req.params.longitude;
    ds.find(latitude, longitude).then(counters=>{
      counters = JSON.parse(JSON.stringify(counters));
      if (counters.length === 0) {
        res.send([]);
      } else {
        var services = [];
        counters.forEach(element => {
          const date = getDate(element.perfObj.period);
          services.push(ds.measurement(element.id, date.start, date.end));
        });

        Promise.all(services).then(measurements=>{
          let values = [];
          measurements = JSON.parse(JSON.stringify(measurements));
          measurements.forEach(data=>{
            values = values.concat(data);
          });
          res.send(values);
        }).catch(err=>res.status(500).send(err));
        // end if
      }
      // end ds find
    }).catch(err=>res.status(500).send(err));
  });

  server.use(router);
};
