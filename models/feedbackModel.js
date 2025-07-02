const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model("feedback", feedbackSchema);
