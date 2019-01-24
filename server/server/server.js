'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

// Otorisasi Rest
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://ngx-ems.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://ems-satunol.ddns.net/',
    issuer: "https://ngx-ems.auth0.com/",
    algorithms: ['RS256']
});

app.use('/api/containers', function(req, res, next) {
  next();
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(401).send('Unauthorized!');
  } else {
      res.status(401).send(err);
  }
});

app.use(jwtCheck);
// End Ototirsasi Rest



app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var client = new kafka.Client('localhost:2181');
var topics = [{
  topic: 'alarm.data'
}, {
  topic: 'perfmeasurement.data'
}];
var options = {
  groupId:  'kafkaNode',
  fromOffset: false
};
var consumer = new Consumer(client, topics, options);
var offset = new kafka.Offset(client);

var Producer = kafka.Producer;
var producer = new Producer(client);
const winston = require('winston');

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;
  // start the server if `$ node server.js`


  var generateKey = () => {
    let key = '';
    const possible = `0123456789`;
    for (let i = 0; i < 19; i++) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return key;
  }

  var generatePerfs = (configs) => {
    let results = [];
    for (const config of configs) {
      const message = JSON.stringify({
        counter: {
          id: config.id
        },
        measurementTime: new Date().toISOString(),
        measurementValue: config.value
      });
      results.push({
        topic: 'perfmeasurement.data',
        messages: message,
        partition: 0
      });
    }
    return results;
  }

  // 228 managed object
  var generateAlarms = (configs) => {
    let results = [];
    for(const config of configs) {
      const message = JSON.stringify({
        id: config.key,
        alarmObj: {id: config.id},
        type: "Security",
        severity: config.severity,
        description: config.description,
        actTime: new Date().toISOString(),
        ackTime: null,
        ackUser: null
      });
      results.push({
        topic: 'alarm.data',
        messages: message,
        partition: 0
      });
    }
    return results;
  }

  let alarmActive = 0;
  let clearAlarm  = false;
  let key;
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    producer.on('ready', () => {
      app.io.on('connection', (socket) => {
        socket.on('command.data', (message) => {
          console.log(message);
          producer.send([{ topic: 'command.data', messages: message, partition: 0}], () => {
            winston.info('Send Message Command.data', message)
          });
        });
      });
    });
  }
  /*
  producer.on('ready', () => {
    setInterval(() => {
      const configPerf = [
        {id: 516, value: (Math.floor(Math.random() * (20 - 15 + 1)) + 15) * -1},
        {id: 538, value: Math.round(Math.random()) },
        {id: 539, value: Math.round(Math.random()) },
        {id: 519, value: (Math.floor(Math.random() * (20 - 15 + 1)) + 15) * -1}
      ];
      let configAlarm = [];
      let producers = [...generatePerfs(configPerf)];
      if (clearAlarm) {
        configAlarm.push({id: 228, description: "The Chiller is closed", severity: "CLEAR", key: key});
        clearAlarm = false;
      }
      if (alarmActive === 0) {
        const newKey = generateKey();
        configAlarm = [
          {id: 228, description: "The chiller is opened", severity: "MAJOR", key: newKey}
        ];
        alarmActive = 4;
        clearAlarm  = true;
        key = newKey;
      }
      if (configAlarm.length !== 0) {
        producers = [...producers, ...generateAlarms(configAlarm)];
      }
      alarmActive -= 1;
      producer.send(producers, () => {});
    }, 5 * 60 * 1000);
  });
  */

  producer.on('error', err => winston.error('Producer Error', err));
  client.on('error', err => winston.error('Tidak bisa connect ke kafka', err));
  consumer.on('error', err => winston.error('Tidak bisa konek consumer message kafka', err));
  consumer.on('offsetOutOfRange', topic => {
    winston.info('offset out of range', topic);
    topic.maxNum = 2;
    offset.fetch([topic], (err, offsets) => {
      var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
      consumer.setOffset(topic.topic, topic.partition, min);
    });
  });

  consumer.on('message', kafka => {
    console.log(kafka)
    if (kafka != null) {
      app.io.emit(kafka.topic, kafka.value);
      winston.info(kafka.topic, kafka);
    }
  });

});
