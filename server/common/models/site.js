'use strict';

const BelongTo = require('../mixins/BelongsToIntegrityCheck');
const HasMany = require('../mixins/HasManyIntegrityCheck');

module.exports = function(Site, options) {
  Site.validatesUniquenessOf('label', {
    message: 'This site already exists'
  });
  Site.validatesUniquenessOf('location', {
    message: 'This location already exists'
  });
  HasMany(Site, options);
  BelongTo(Site, options);
};
