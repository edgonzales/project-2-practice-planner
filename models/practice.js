// DEFINING OUR MODEL
const mongoose = require("mongoose");


// FIRST WE DEFINE THE SCHEMA
const practiceSchema = new mongoose.Schema(
  {
    name: String,
    date: Date,
    drills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Drill'}],
    description: String
  }
);
// THEN WE COMPILE THE SCHEMA INTO THE MODEL AND EXPORT IT to be used in the controllers!
module.exports = mongoose.model("Practice", practiceSchema);