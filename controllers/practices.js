const PracticeModel = require("../models/practice");
const DrillModel = require('../models/drill');

// ^ MovieModel can perform CRUD On our DB
// https://mongoosejs.com/docs/api/model.html <-- All the methods are listed here
module.exports = {
  index,
  new: newPractice,
  create
};

async function index (req, res) {
    console.log(req.user);
    try {
        const practiceDocuments = await PracticeModel.find({}).populate('drills').exec();
        console.log(practiceDocuments, '<------practice documents');        
        practiceDocuments.forEach( function(p){ 
          console.log('drills in practice ------->', p.drills);     
        });
        res.render('practices/index.ejs', {practiceDocs: practiceDocuments});
        
    } catch (err) {
        console.log(err);
        res.render(err);
    }
}

async function newPractice(req, res) {
    try {
        const drillDocuments = await DrillModel.find({});
        res.render("practices/new", {drillDocs: drillDocuments});
    } catch (err) {
        console.log(err);
        res.render(err);
    }
  }

  async function create (req, res){
    try {
        console.log(req.body);
        const practiceDoc = await PracticeModel.create(req.body);
        res.redirect("/practices"); 
      } catch (err) {
        console.log(err)
        res.send(err);
        // optionally
        //next(err);
      }
  }