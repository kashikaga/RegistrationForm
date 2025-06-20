const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    match: [/^[a-zA-Z ]+$/, 'Only alphabets are allowed for name']
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value < new Date();
      },
      message: 'DOB must be a past date'
    }
  },
  address: {
    type: String,
    required: true,
    minlength: [10, 'Address must be at least 10 characters long']
  },
  branch: {
    type: String,
    enum: ['CS', 'IT', 'E&TC', 'Mechanical'],
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Student', StudentSchema);