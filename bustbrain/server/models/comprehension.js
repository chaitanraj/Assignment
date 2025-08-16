const mongoose = require('mongoose');
const express = require("express");


const comprehensionSchema = new mongoose.Schema({
  passage: {
    type: String,
    required: true
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    correctAnswer: {
      type: Number, // 0=A, 1=B, 2=C, 3=D
      required: true
    }

  }]
});

const comprehension=mongoose.model('comprehension',comprehensionSchema)

module.exports=comprehension;

