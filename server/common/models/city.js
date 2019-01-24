'use strict';

const BelongTo = require('../mixins/BelongsToIntegrityCheck');
const HasMany = require('../mixins/HasManyIntegrityCheck');

module.exports = function(City, options) {
  City.validatesUniquenessOf('label', {
    message: 'This city already exists'
  });
  City.validatesUniquenessOf('location', {
    message: 'This location already exists'
  });
  BelongTo(City, options);
  HasMany(City, options);
};
