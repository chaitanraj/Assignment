const mongoose=require("mongoose");
const express = require("express");

const categoriseSchema = new mongoose.Schema({
  category: {
    name: {
      type: String,
      required: true
    }
  },
  categories: [{
    name: {
      type: String,
      required: true
    },
    items: [{
      name: {
        type: String,
        required: true
      }
    }]
  }]
});
const categorise=mongoose.model('Category',categoriseSchema)


async function saveCategorizeQuestion(questionData) {
  const itemsMap = new Map();
  
  // Group items by category
  questionData.items.forEach(item => {
    if (!itemsMap.has(item.categoryId)) itemsMap.set(item.categoryId, []);
    itemsMap.get(item.categoryId).push({ name: item.name });
  });
  
  // Create and save
  return await new categorise({
    category: { name: questionData.questionTitle || "Categorization Question" },
    categories: questionData.categories.map(cat => ({
      name: cat.name,
      items: itemsMap.get(cat.id) || []
    }))
  }).save();
}


module.exports={categorise,saveCategorizeQuestion};