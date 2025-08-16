const express=require("express")
const app=express();
const PORT=5000;
const router=express.Router();
const mongoose=require("mongoose")
const cors=require("cors")

app.use(cors());
app.use(express.json());


mongoose
  .connect('mongodb://localhost:27017/bustbrain')
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

app.use("/cloze",ClozeRouter);
app.use("/categorise",CategoriseRouter);
app.use("/comprehension",ComprehensionRouter);

