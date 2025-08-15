const express = require("express");
const router = express.Router();
const cloze = require("../models/cloze");

router.post("/", async (req, res) => {
    console.log("Cloze Route Hit");
    console.log("Request body:", req.body); // Debug log
    
    if (!req.body) {
        return res.status(400).json({ error: "Body missing for cloze" });
    }
    
    const { sentence, selectedWords } = req.body;
    try {
        const data = new cloze({ 
            sentence, 
            words: selectedWords 
        });
        
        await data.save();
        return res.status(200).json({ message: "Cloze data saved" });
    } catch (error) {
        console.error("Cloze save error:", error);
        return res.status(500).json({ error: "Error in cloze route" });
    }
});

module.exports = router;