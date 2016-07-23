'use strict';

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
mongoose.Promise = require('bluebird');
import { Schema } from 'mongoose';

var schema = new Schema({
  name: { type: String, required: true, unique: true },
  reg: { type: String, required: true, unique: true },
  email: {
    type: String,
    lowercase: true,
    required: true,
		unique: true
  },
  phone: String
});
schema.plugin(uniqueValidator);
/**
 * Virtuals
 */

// Public profile information
schema
  .virtual('profile')
  .get(function () {
    return {
      'name': this.name,
      'email': this.email,
      'reg': this.reg,
      'phone': this.phone
    };
  });

// Non-sensitive info we'll be putting in the token
schema
  .virtual('token')
  .get(function () {
    return {
      '_id': this._id,
      'email': this.email
    };
  });

export default mongoose.model('Doctor', schema);
