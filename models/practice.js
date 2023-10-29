// DEFINING OUR MODEL
const mongoose = require("mongoose");


// FIRST WE DEFINE THE SCHEMA
const practiceSchema = new mongoose.Schema(
  {
    name: {
        type: String
    }
  }
);
// THEN WE COMPILE THE SCHEMA INTO THE MODEL AND EXPORT IT to be used in the controllers!
module.exports = mongoose.model("Practice", practiceSchema);