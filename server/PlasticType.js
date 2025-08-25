// server/PlasticType.js

const mongoose = require('mongoose');

const PlasticTypeSchema = new mongoose.Schema({
  name: String,
  code: String,
  description: String,
  examples: String,
  keywords: [String],               // <-- add this
  updatedAt: { type: Date, default: Date.now }
  // Add more fields as you want
});

module.exports = mongoose.model('PlasticType', PlasticTypeSchema);
