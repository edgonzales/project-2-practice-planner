const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	googleId: { // <-- This is the unique identifier we get from google which want to store!
	  type: String,
	  required: true
	},
	email: String,
	avatar: String
  }, {
	timestamps: true
  });


  module.exports = mongoose.model('User', userSchema)