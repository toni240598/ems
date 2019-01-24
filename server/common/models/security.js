'use strict';

const HasMany = require('../mixins/HasManyIntegrityCheck');

module.exports = function(Security, options) {
  
  Security.validatesUniquenessOf('username', {
    message: 'Username already exist',
  });

  Security.validatesUniquenessOf('email', {
    message: 'Email already exist',
  });

  Security.validatesUniquenessOf('phone', {
    message: 'Phone number already exist',
  });
  
  HasMany(Security, options);
};
