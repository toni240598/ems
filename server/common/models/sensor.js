'use strict';

const HasMany = require('../mixins/HasManyIntegrityCheck');
const BelongsTo = require('../mixins/BelongsToIntegrityCheck');
module.exports = function(Sensor, options) {
  HasMany(Sensor, options);
};
