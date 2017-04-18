const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: {type: String, required: true},
  accessToken: {type: String, required: true},
  questionLibrary: {type: Object, required: true},
  score: {type: Number, required: true},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
