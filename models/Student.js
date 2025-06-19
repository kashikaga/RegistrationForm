const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  codeforcesHandle: String,
  currentRating: Number,
  maxRating: Number,
});

module.exports = mongoose.model('Student', StudentSchema);