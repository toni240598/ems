'use strict';

const BelongTo = require('../mixins/BelongsToIntegrityCheck');

module.exports = function(Managedobject, options) {
  BelongTo(Managedobject, options);
};
