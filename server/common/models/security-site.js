'use strict';

var BelongTo = require('../mixins/BelongsToIntegrityCheck');
module.exports = function(Securitysite, options) {
  BelongTo(Securitysite, options);
};
