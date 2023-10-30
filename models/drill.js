// DEFINING OUR MODEL
const mongoose = require("mongoose");


// FIRST WE DEFINE THE SCHEMA
const drillSchema = new mongoose.Schema(
  {
    name: String,
    categories: {
        type: String,
        enum: ['Conditioning', 'Dribbling', 'Goalkeeping', 'Passing', 'Shooting']
    },
    minutes: Number,
    description: String
    // missing user
  }
);
// THEN WE COMPILE THE SCHEMA INTO THE MODEL AND EXPORT IT to be used in the controllers!
module.exports = mongoose.model("Drill", drillSchema);