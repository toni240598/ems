'use strict';
var BelongsTo = require('../mixins/BelongsToIntegrityCheck');
module.exports = function(Mappingsensor, options) {
  BelongsTo(Mappingsensor, options);
};
