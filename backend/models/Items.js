const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  userId: String, // who added item

  name: String,
  description: String,

  type: {
    type: String,
    enum: ["Lost", "Found"]
  },

  location: String,
  date: {
    type: Date,
    default: Date.now
  },

  contact: String
});

module.exports = mongoose.model("Item", itemSchema);