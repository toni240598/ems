'use strict';

const HasMany = require('../mixins/HasManyIntegrityCheck');
module.exports = function(app, options) {
  app.validatesUniquenessOf('email', { message: 'Email already exist'});
  HasMany(app, options);
};
