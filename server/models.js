const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  portuguese: {type: String, required: true},
  english: {type: String, required: true},
  score: {type: Number}
});
const userSchema = mongoose.Schema({
  googleId: {type: String, required: true},
  accessToken: {type: String, required: true},
  questions: [questionSchema],
  score: {type: Number}
});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = { User, Question };
