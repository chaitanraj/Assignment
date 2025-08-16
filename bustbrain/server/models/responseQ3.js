const mongoose = require('mongoose');

const answerQ3Schema = new mongoose.Schema({
  selectedAnswers: Object,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResponseQ3', answerQ3Schema);