const mongoose = require('mongoose');

const answerQ2Schema = new mongoose.Schema({
  sentence: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResponseQ2', answerQ2Schema);