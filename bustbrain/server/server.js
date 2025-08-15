const express=require("express")
const app=express();
const PORT=5000;
const router=express.Router();
const mongoose=require("mongoose")
const cors=require("cors")

app.use(cors());

mongoose
  .connect('mongodb://localhost:27017/bustbrain')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(5000,()=>{
    console.log(`Server running on ${PORT}`)
})
app.use(express.json());

app.get("/",()=>{
    console.log("Backend Route Reached.")
})

const ClozeRouter=require("./routes/cloze")
app.use("/cloze",ClozeRouter);

