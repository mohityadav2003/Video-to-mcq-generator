const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const segmentSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  text: String,
  questions: [questionSchema],
});

const transcriptSchema = new mongoose.Schema({
  videoId: mongoose.Schema.Types.ObjectId,
  segments: [segmentSchema],
});

module.exports = mongoose.model('Transcript', transcriptSchema);