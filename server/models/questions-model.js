const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  portuguese: {type: String, required: true},
  english: {type: String, required: true},
  correctGuess: {type: Boolean}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
