const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Video', videoSchema);