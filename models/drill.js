// DEFINING OUR MODEL
const mongoose = require("mongoose");


// FIRST WE DEFINE THE SCHEMA
const drillSchema = new mongoose.Schema(
  {
    name: String,
    category: {
        type: String,
        enum: ['Conditioning', 'Dribbling', 'Goalkeeping', 'Passing', 'Shooting']
    },
    minutes: Number,
    description: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String // <- store the things on the review you'll display, 
    // so you don't populate everytime! 
  }
);
// THEN WE COMPILE THE SCHEMA INTO THE MODEL AND EXPORT IT to be used in the controllers!
module.exports = mongoose.model("Drill", drillSchema);