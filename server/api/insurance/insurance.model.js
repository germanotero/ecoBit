'use strict';

import mongoose from 'mongoose';
import { Schema } from 'mongoose';
let beautifyUnique = require('mongoose-beautiful-unique-validation');

var schema = new Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  phone: String,
	cost: Number,
	honorario: Number,
	tariff: Number
}).plugin(beautifyUnique);

export default mongoose.model('Insurance', schema);
