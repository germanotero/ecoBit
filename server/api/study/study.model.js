'use strict';

import mongoose from 'mongoose';
import { Schema } from 'mongoose';
let beautifyUnique = require('mongoose-beautiful-unique-validation');

var schema = new Schema({
  code: { type: String, trim: true },
  name: { type: String, required: true, trim: true },
  costCount: Number,
  honorarioCount: Number,
  isRegistered: { type: Boolean }
}).plugin(beautifyUnique);

export default mongoose.model('Study', schema);
