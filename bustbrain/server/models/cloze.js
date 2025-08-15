const mongoose=require("mongoose")
const express = require("express");

const clozeSchema=new mongoose.Schema({
    sentence:{
        type:String,
        required:true,
    },
    words:{
        type:[String],
        required:true,
    }
})

const cloze=mongoose.model("Cloze",clozeSchema)

module.exports=cloze;