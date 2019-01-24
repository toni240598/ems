'use strict';

const HasMany = require('../mixins/HasManyIntegrityCheck');

module.exports = function(Province, options) {
  Province.validatesUniquenessOf('label', {
    message: 'This province already exists'
  });
  Province.validatesUniquenessOf('location', {
    message: 'This location already exists'
  });
  HasMany(Province, options);
};
