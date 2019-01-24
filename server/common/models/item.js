'use strict';

var BelongsTo = require('../mixins/BelongsToIntegrityCheck');
module.exports = function(Item, options) {
  Item.validatesInclusionOf('type', {in: [
    'atm', 'cashier', 'rack2x2', 'rack5x2', 'rack5x1',
    'door-left1', 'door-top1', 'door-right1', 'door-bottom1',
    'door-left2', 'door-top2', 'door-right2', 'door-bottom2',
  ]});
  BelongsTo(Item, options);
};
