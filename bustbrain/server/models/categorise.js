const mongoose=require("mongoose");
const express = require("express");

const categoriseSchema=new mongoose.Schema({
    category:{
        name:String,
        required:true,
    },
    Items:{
        name:[String],
        categoryId:ObjectId,
    }
});

const categorise=mongoose.model('Category',categoriseSchema)

module.exports=categorise;