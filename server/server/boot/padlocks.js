"use strict";

var loopback = require('loopback');

const app = require('../server');
module.exports = (server) => {
  let router = server.loopback.Router();
  router.post('/api/workers/:id/change-password', (req, res) => {
    server.models.worker
      .changePassword(req.params.id, req.body.oldPassword, req.body.newPassword)
      .then(success => res.send(success))
      .catch(error => res.status(500).send(error));
  });

  router.get('/api/workers/:id/workOrders', (req, res) => {
    server.models.work_order
      .find({
        where: {
          worker_id: req.params.id,
          status: {
            inq: ['idle', 'request', 'reject', 'approve']
          },
          end : { gte : Date.now()}
        },
        include: ['accessKeys', 'site']
      })
      .then(success => res.send(success))
      .catch(error => res.status(500).send(error));
  });

  router.post('/api/accessKeys/:id/open', (req, res) => {
    server.models.access_key.findOne({
        where: {
          id: req.params.id
        },
        include: ['workOrder']
      })
      .then(key => {
        if (key) {
          key = JSON.parse(JSON.stringify(key));
          if (key.workOrder.status === 'approve') {
            server.models.access_key_history.create({
                access_key_id: req.params.id
              })
              .then(success => {
                app.io.emit('key.history', JSON.stringify(success));
                res.send();
              })
              .catch(error => res.send(error));
          }
        } else {
          res.status(500).send('Access key not found');
        }
      })
      .catch(error => res.status(500).send(error));
  });


  router.post('/api/workOrders/:id/finish', (req, res) => {
    server.models.work_order.findById(req.params.id)
      .then(order => {
        if (order) {
          const valueWorkOrder = {
            status: 'finish',
            worker_id: order.worker_id,
            site_id: order.site_id,
            start: order.start,
            end: order.end,
            project: order.project,
            activity: order.activity
          };
          Promise.all([
            server.models.work_order_history.create({
              work_order_id: req.params.id,
              picture: req.body.picture,
              status: 'finish'
            }),
            server.models.work_order.replaceById(req.params.id, valueWorkOrder)
          ]).then(success => {
            valueWorkOrder.id = parseInt(req.params.id);
            app.io.emit('order.history', JSON.stringify(success[0]));
            app.io.emit('work.order', JSON.stringify(valueWorkOrder));
            res.send();
          }).catch(error  => res.status(500).send(error));
        } else {
          res.status(500).send('Work order not found');
        }
      })
  });

  router.post('/api/workOrders/:id/request', (req, res) => {
    server.models.work_order.findById(req.params.id)
      .then(order => {
        if (order) {
          if (order.status === 'request') {
            res.status(500).send('Work order already request');
          } else if (order.status === 'expired' || order.status === 'finish' || order.status === 'approve') {
            res.status(500).send('status work order ' + order.status);
          } else {
            Promise.all([
                server.models.request_key.create({
                  work_order_id: req.params.id,
                  picture: req.body.picture
                }),
                server.models.work_order_history.create({
                  work_order_id: req.params.id,
                  picture: req.body.picture,
                  status: 'request'
                })
              ]).then(success => {
                const valueOrder = {
                  status: 'request',
                  worker_id: order.worker_id,
                  site_id: order.site_id,
                  start: order.start,
                  end: order.end,
                  project: order.project,
                  activity: order.activity
                };
                server.models.work_order.replaceById(req.params.id, valueOrder);
                app.io.emit('request.key', JSON.stringify(success[0]));
                valueOrder.id = parseInt(req.params.id);
                app.io.emit('order.history', JSON.stringify(success[1]));
                app.io.emit('work.order', JSON.stringify(valueOrder));
                res.send();
              })
              .catch(error => res.send(error))
          }
        } else {
          res.status(500).send('Work order not available')
        }
      });
  });


  server.use(router);
};
