const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  droppedItems: { type: Object, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResponseQ1', answerSchema);
