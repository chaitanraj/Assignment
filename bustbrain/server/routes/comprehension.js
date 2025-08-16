const express = require("express")
const router = express.Router();
const Comprehension = require("../models/comprehension") // Use capital C

router.post('/', async (req, res) => {
      console.log('Route hit!'); // Check if route is being called
  console.log('Request body:', req.body); // Check if data is received
  try {
    const newComprehension = new Comprehension(req.body); // Different variable name
    await newComprehension.save();
    res.json({ success: true, id: newComprehension._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Comprehension.findOne();
    
    res.json({
      passage: data.passage,
      questions: data.questions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;