const express = require("express")
const router = express.Router();
const Comprehension = require("../models/comprehension")

router.post('/', async (req, res) => {
      console.log('Route hit!'); 
  console.log('Request body:', req.body); 
  try {
    const newComprehension = new Comprehension(req.body); 
    await newComprehension.save();
    res.json({ success: true, id: newComprehension._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Comprehension.findOne().sort({ _id: -1 });
    
    res.json({
      passage: data.passage,
      questions: data.questions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;