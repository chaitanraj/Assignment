const express=require("express")
const app=express();
const PORT=5000;
const router=express.Router();
const mongoose=require("mongoose")
const cors=require("cors")
const multer = require('multer');
const responseQ1 = require("./models/responseQ1");
const ResponseQ2=require("./models/responseQ2")
const ResponseQ3=require("./models/responseQ3")
require("dotenv").config();


app.use(cors());

app.use(express.json());
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
 res.json({ message: 'Uploaded', file: req.file.filename });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(5000,()=>{
    console.log(`Server running on ${PORT}`)
})

app.get("/",()=>{
    console.log("Backend Route Reached.")
})

const ClozeRouter=require("./routes/cloze")
const CategoriseRouter=require("./routes/categorise")
const ComprehensionRouter=require("./routes/comprehension")


// Saving responses 
// Q1
app.post('/responseQ1', async (req, res) => {
  try {
    const { droppedItems } = req.body;
    const answer = new responseQ1({ droppedItems });
    await answer.save();
    res.json({ success: true, data: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});
// Q2 
app.post('/responseQ2', async (req, res) => {
  try {
    const { sentence } = req.body;
    console.log('Received sentence:', sentence);
    const answer = new ResponseQ2({ sentence });
    await answer.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});
// Q3 
app.post('/responseQ3', async (req, res) => {
  try {
    const { selectedAnswers } = req.body;
    console.log('Received answers:', selectedAnswers);
    const answer = new ResponseQ3({ selectedAnswers });
    await answer.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.use("/cloze",ClozeRouter);
app.use("/categorise",CategoriseRouter);
app.use("/comprehension",ComprehensionRouter);

