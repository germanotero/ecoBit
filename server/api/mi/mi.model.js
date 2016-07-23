'use strict';

import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import {Schema} from 'mongoose';

var schema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    required: true
  },
	phone: String
});

/**
 * Validations
 */

// Validate empty email
schema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate email is not taken
schema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    return this.constructor.findOne({ email: value }).exec()
      .then(function(doctor) {
        if (doctor) {
          if (self.id === doctor.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

export default mongoose.model('MedicalInsurance', schema);
