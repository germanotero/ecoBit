'use strict';

import mongoose from 'mongoose';
import { Schema } from 'mongoose';
let beautifyUnique = require('mongoose-beautiful-unique-validation');

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
}).plugin(beautifyUnique);

export default mongoose.model('Doctor', schema);
