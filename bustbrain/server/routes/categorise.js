const express = require("express");
const router = express.Router();
const { categorise } = require("../models/categorise");
const { saveCategorizeQuestion } = require('../models/categorise');


router.post('/', async (req, res) => {
  try {
    const savedQuestion = await saveCategorizeQuestion(req.body);
    res.json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/',async(req,res)=>{
    const doc=await categorise.findOne();
    const categoryNames = doc.categories.map(cat => cat.name);
     const itemNames = doc.categories.flatMap(cat => 
        cat.items.map(item => item.name)
    );
    return res.json({category:categoryNames,item:itemNames})

})


module.exports=router;