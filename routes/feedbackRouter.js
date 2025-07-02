const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Public
router.post('/', async (req, res) => {
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: "Feedback is required" });
  }

  try {
    const newFeedback = await Feedback.create({ feedback });
    console.log(" Feedback saved to DB:", newFeedback);
    res.status(200).json({ message: "Feedback received successfully" });
  } catch (error) {
    console.error(" Error saving feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
