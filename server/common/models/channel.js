'use strict';
const BelongTo = require('../mixins/BelongsToIntegrityCheck');
const HasMany = require('../mixins/HasManyIntegrityCheck');
module.exports = function(Channel, options) {
  Channel.validatesUniquenessOf('label', {
    message: 'This channel already exist',
  });
  BelongTo(Channel, options);
  HasMany(Channel, options);
};
