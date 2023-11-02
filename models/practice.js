// DEFINING OUR MODEL
const mongoose = require("mongoose");


// FIRST WE DEFINE THE SCHEMA
const practiceSchema = new mongoose.Schema(
  {
    name: String,
    date: Date,
    drills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Drill'}],
    description: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }
);

module.exports = mongoose.model("Practice", practiceSchema);