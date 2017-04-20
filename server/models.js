const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: {type: String, required: true},
  accessToken: {type: String, required: true},
  questions: {type: Array},
  score: {type: Number}
});

const questionSchema = mongoose.Schema({
  portuguese: {type: String, required: true},
  english: {type: String, required: true},
  questionScore: {type: Number}
});


const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = { User, Question };
