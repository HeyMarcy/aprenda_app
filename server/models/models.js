const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: {type: String, required: true},
  accessToken: {type: String, required: true}
});

const questionSchema = mongoose.Schema({
  portuguese: {type: String, required: true},
  english: {type: String, required: true},
});


const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = { User, Question };
