const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String, // Use uppercase "String" for string data type
    required: true,
  },
  email: {
    type: String, // Use uppercase "String" for string data type
    required: true,
  },
  phone: {
    type: String, // Use uppercase "String" for string data type
    required: true,
  },
  image: {
    type: String, // Use uppercase "String" for string data type
    required: true,
  },
  password: {
    type: String, // Use uppercase "String" for string data type
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Users', userSchema); // Use 'User' as the model name
