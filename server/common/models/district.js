'use strict';

const BelongTo = require('../mixins/BelongsToIntegrityCheck');
const HasMany = require('../mixins/HasManyIntegrityCheck');

module.exports = function(District, options) {
  District.validatesUniquenessOf('label', {
    message: 'This district already exists'
  });
  District.validatesUniquenessOf('location', {
    message: 'This location already exists'
  });
  BelongTo(District, options);
  HasMany(District, options);
};
