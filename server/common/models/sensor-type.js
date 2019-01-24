'use strict';

const HasMany = require('../mixins/HasManyIntegrityCheck');
module.exports = function(Channeltype, options) {
  Channeltype.validatesUniquenessOf('label', {
    message: 'This channel type already exist',
  });
  HasMany(Channeltype, options);
};
