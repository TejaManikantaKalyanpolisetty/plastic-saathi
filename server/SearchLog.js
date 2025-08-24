// const mongoose = require('mongoose');

// const SearchLogSchema = new mongoose.Schema({
//   term: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
//   // You can add more fields later if you want (e.g., userId, IP, etc.)
// });

// module.exports = mongoose.model('SearchLog', SearchLogSchema);

// server/SearchLog.js
const mongoose = require('mongoose');

const SearchLogSchema = new mongoose.Schema({
  term: { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now }
});

// helpful indexes
SearchLogSchema.index({ timestamp: -1 });
SearchLogSchema.index({ term: 1 });

module.exports = mongoose.model('SearchLog', SearchLogSchema);
